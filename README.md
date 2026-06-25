# Pawan D. Sonar — Developer Portfolio

A premium, dark-first developer portfolio built with **React, FastAPI, MongoDB, Tailwind CSS, and Framer Motion**.

Live preview: _add your deployed URL here_

![Tech](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)
![Tech](https://img.shields.io/badge/FastAPI-0.110-009688?logo=fastapi&logoColor=white)
![Tech](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb&logoColor=white)
![Tech](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)

---

## Features

- 10 polished sections — Hero, About, Skills, Experience, Projects, Achievements, Live GitHub Stats, Resume, Recruiter "Why Hire Me", Contact
- Dark / Light theme toggle with localStorage persistence
- Glassmorphism cards with emerald & cyan accent palette
- Framer Motion entrance animations and scroll reveals
- **Live GitHub integration** — fetches profile and top repos in real time (1-hour MongoDB cache)
- **Contact form** — persists submissions to MongoDB and (optionally) forwards them to your inbox via Resend
- SEO-ready — Open Graph, Twitter Cards, JSON-LD Person schema
- Fully responsive, mobile-first
- All interactive elements have `data-testid` attributes for automated testing

---

## Tech Stack

| Layer    | Technology                                     |
| -------- | ---------------------------------------------- |
| Frontend | React 19, CRA + craco, Tailwind, Framer Motion, lucide-react, sonner |
| Backend  | FastAPI, Motor (async MongoDB), httpx, Resend  |
| Database | MongoDB                                         |

---

## Project Structure

```
.
├── backend/
│   ├── server.py            # FastAPI app — all /api routes
│   ├── requirements.txt
│   └── .env                 # see .env.example
└── frontend/
    ├── public/
    │   ├── avatar.png
    │   ├── resume/          # your PDF goes here
    │   └── projects/        # project screenshots
    ├── src/
    │   ├── App.js
    │   ├── components/      # Navbar, Footer, sections/
    │   ├── context/         # ThemeContext
    │   └── data/portfolio.js  # ← edit your personal info here
    └── package.json
```

> **All your personal content (skills, projects, experience, achievements) lives in [`frontend/src/data/portfolio.js`](frontend/src/data/portfolio.js).** Edit that file to customize without touching components.

---

## Quick Start (Local)

### Prerequisites
- Node.js ≥ 18 and Yarn
- Python ≥ 3.10
- MongoDB running locally (or Atlas connection string)

### 1 — Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate     # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# edit .env — set MONGO_URL, DB_NAME, etc.

uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

Backend runs at `http://localhost:8001` — health check at `/api/health`.

### 2 — Frontend

```bash
cd frontend
yarn install

cp .env.example .env
# edit .env — set REACT_APP_BACKEND_URL=http://localhost:8001

yarn start
```

Frontend runs at `http://localhost:3000`.

---

## Environment Variables

### `backend/.env`

| Key             | Required | Description                                          |
| --------------- | -------- | ---------------------------------------------------- |
| `MONGO_URL`     | ✅       | MongoDB connection string                            |
| `DB_NAME`       | ✅       | Database name                                        |
| `CORS_ORIGINS`  | ✅       | Comma-separated allowed origins (use `*` for dev)    |
| `RESEND_API_KEY`| ⛔ opt   | Get from [resend.com](https://resend.com) to email contact submissions |
| `SENDER_EMAIL`  | ⛔ opt   | Verified Resend sender (default `onboarding@resend.dev`) |
| `OWNER_EMAIL`   | ⛔ opt   | Email that receives contact form messages            |
| `ADMIN_TOKEN`   | ⛔ opt   | Required to list contact messages via `GET /api/contact` |

### `frontend/.env`

| Key                      | Required | Description                          |
| ------------------------ | -------- | ------------------------------------ |
| `REACT_APP_BACKEND_URL`  | ✅       | Public URL of the FastAPI backend    |

---

## API Routes

| Method | Route                                  | Auth         | Description                              |
| ------ | -------------------------------------- | ------------ | ---------------------------------------- |
| GET    | `/api/health`                          | —            | Health check + email config status       |
| GET    | `/api/github/stats?username=<user>`    | —            | Live GitHub profile + top repos (cached) |
| POST   | `/api/contact`                         | —            | Submit contact form                      |
| GET    | `/api/contact`                         | `X-Admin-Token` | List contact messages (admin only)    |

---

## Deployment — Render

A ready-to-use blueprint is included at [`render.yaml`](render.yaml). On Render:

1. Push this repo to GitHub.
2. Render Dashboard → **New** → **Blueprint** → connect your repo.
3. Set the secret environment variables (`MONGO_URL`, `RESEND_API_KEY`, etc.).
4. Deploy.

Or deploy services manually — see the [Render docs](https://render.com/docs/deploy-create-services).

### Other hosting options
- **Vercel** for the React frontend (set `REACT_APP_BACKEND_URL` to your backend URL)
- **Railway / Fly.io** for the FastAPI backend
- **MongoDB Atlas** for the database (free tier works great)

---

## Customizing Your Portfolio

Everything you'd typically change lives in **`frontend/src/data/portfolio.js`** — your name, tagline, skills, projects, experience, achievements, social links. No need to touch component files.

To replace assets:
- **Resume PDF** → `frontend/public/resume/Pawan_Sonar_Resume.pdf`
- **Avatar photo** → `frontend/public/avatar.png`
- **Project screenshots** → `frontend/public/projects/<project-slug>/`

---

## License

MIT © Pawan D. Sonar
