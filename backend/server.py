from fastapi import FastAPI, APIRouter, HTTPException, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import httpx

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Optional Resend email
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '').strip()
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
OWNER_EMAIL = os.environ.get('OWNER_EMAIL', 'pawan.sonar@example.com')
ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN', '').strip()
GITHUB_TOKEN = os.environ.get('GITHUB_TOKEN', '').strip()

resend = None
if RESEND_API_KEY:
    try:
        import resend as _resend
        _resend.api_key = RESEND_API_KEY
        resend = _resend
    except Exception:
        resend = None

# Create the main app without a prefix
app = FastAPI(title="Pawan Sonar Portfolio API")
api_router = APIRouter(prefix="/api")


# ----- Models -----
class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(min_length=10, max_length=4000)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_sent: bool = False


class ContactResponse(BaseModel):
    success: bool
    id: str
    email_delivered: bool
    message: str


class GitHubStats(BaseModel):
    username: str
    name: Optional[str] = None
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    public_repos: int = 0
    followers: int = 0
    following: int = 0
    html_url: Optional[str] = None
    top_repos: List[dict] = []


# ----- Helpers -----
async def send_contact_email(payload: ContactMessage) -> bool:
    """Send email via Resend in a thread. Returns True on success."""
    if not resend or not RESEND_API_KEY:
        return False
    html = f"""
    <table style="font-family: -apple-system, sans-serif; max-width: 600px;">
      <tr><td style="padding:16px;background:#0a0a0a;color:#10B981;font-size:18px;font-weight:600;">
        New Portfolio Contact Message
      </td></tr>
      <tr><td style="padding:20px;background:#fafafa;color:#111;">
        <p><strong>From:</strong> {payload.name} &lt;{payload.email}&gt;</p>
        <p><strong>Received:</strong> {payload.created_at.isoformat()}</p>
        <hr style="border:none;border-top:1px solid #ddd;margin:16px 0;"/>
        <p style="white-space:pre-wrap;line-height:1.6;">{payload.message}</p>
      </td></tr>
    </table>
    """
    params = {
        "from": SENDER_EMAIL,
        "to": [OWNER_EMAIL],
        "reply_to": payload.email,
        "subject": f"Portfolio Contact — {payload.name}",
        "html": html,
    }
    try:
        await asyncio.to_thread(resend.Emails.send, params)
        return True
    except Exception as e:
        logger.error(f"Resend email failed: {e}")
        return False


# ----- Routes -----
@api_router.get("/")
async def root():
    return {"message": "Pawan Sonar Portfolio API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {
        "status": "healthy",
        "email_configured": bool(RESEND_API_KEY),
        "github_authenticated": bool(GITHUB_TOKEN),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(payload: ContactMessageCreate):
    msg = ContactMessage(**payload.model_dump())
    email_ok = await send_contact_email(msg)
    msg.email_sent = email_ok

    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)

    return ContactResponse(
        success=True,
        id=msg.id,
        email_delivered=email_ok,
        message="Thanks! Your message has been received.",
    )


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages(limit: int = 50, x_admin_token: str = Header(default="")):
    if not ADMIN_TOKEN or x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Admin token required")
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
    return docs


@api_router.get("/github/stats", response_model=GitHubStats)
async def github_stats(username: str = "Pawan-Sonar"):
    """Fetch live GitHub profile + top repos. Cached in MongoDB for 1 hour."""
    cache_key = f"github:{username}"
    now = datetime.now(timezone.utc)

    cached = None
    try:
        cached = await db.cache.find_one({"_id": cache_key})
        if cached:
            ts = datetime.fromisoformat(cached['updated_at'])
            if (now - ts).total_seconds() < 3600:
                return GitHubStats(**cached['data'])
    except Exception as e:
        logger.warning(f"Cache lookup skipped: {e}")

    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "pawan-portfolio",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    token = os.environ.get('GITHUB_TOKEN', '').strip()
    if token:
        headers["Authorization"] = f"Bearer {token}"

    try:
        async with httpx.AsyncClient(timeout=10.0, headers=headers) as http:
            user_r = await http.get(f"https://api.github.com/users/{username}")
            user_r.raise_for_status()
            user = user_r.json()
            repos_r = await http.get(
                f"https://api.github.com/users/{username}/repos",
                params={"sort": "updated", "per_page": 100},
            )
            repos_r.raise_for_status()
            repos = repos_r.json()
    except Exception as e:
        logger.error(f"GitHub fetch failed: {e}")
        if cached:
            return GitHubStats(**cached['data'])
        raise HTTPException(status_code=502, detail="Could not reach GitHub")

    top = sorted(repos, key=lambda r: r.get('stargazers_count', 0), reverse=True)[:6]
    top_repos = [
        {
            "name": r["name"],
            "description": r.get("description") or "",
            "html_url": r["html_url"],
            "stars": r.get("stargazers_count", 0),
            "forks": r.get("forks_count", 0),
            "language": r.get("language"),
            "updated_at": r.get("updated_at"),
        }
        for r in top
    ]

    data = GitHubStats(
        username=user.get("login", username),
        name=user.get("name"),
        avatar_url=user.get("avatar_url"),
        bio=user.get("bio"),
        public_repos=user.get("public_repos", 0),
        followers=user.get("followers", 0),
        following=user.get("following", 0),
        html_url=user.get("html_url"),
        top_repos=top_repos,
    )

    try:
        await db.cache.update_one(
            {"_id": cache_key},
            {"$set": {"data": data.model_dump(), "updated_at": now.isoformat()}},
            upsert=True,
        )
    except Exception as e:
        logger.warning(f"Cache write skipped: {e}")
    return data


# Include the router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
