import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink, Loader2 } from "lucide-react";
import axios from "axios";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/sections/About";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function GithubStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await axios.get(`${API}/github/stats`, {
          params: { username: portfolioData.githubUsername },
          timeout: 12000,
        });
        if (active) setData(res.data);
      } catch (e) {
        if (active) setError("Could not reach GitHub right now.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="github"
      data-testid="github-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader
          number="06"
          label="github"
          title="Live from GitHub."
          subtitle="Public repositories pulled in real-time from my GitHub profile."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            data-testid="github-profile-card"
            className="lg:col-span-4 rounded-3xl border border-border bg-card/40 backdrop-blur-xl p-8"
          >
            {loading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 size={16} className="animate-spin" /> Loading profile…
              </div>
            ) : error ? (
              <div className="text-sm text-muted-foreground">{error}</div>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Github size={26} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-emerald-400">
                      @{data.username}
                    </div>
                    <div className="text-lg font-semibold">{data.name || data.username}</div>
                  </div>
                </div>
                {data.bio && (
                  <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                    {data.bio}
                  </p>
                )}
                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  <Stat label="Repos" value={data.public_repos} />
                  <Stat label="Followers" value={data.followers} />
                  <Stat label="Following" value={data.following} />
                </div>
                <a
                  href={data.html_url || portfolioData.github}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="github-profile-link"
                  className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-emerald-500/40 hover:text-emerald-400 transition-colors text-sm"
                >
                  Visit profile <ExternalLink size={14} />
                </a>
              </>
            )}
          </motion.div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-6 h-36 animate-pulse"
                  />
                ))
              : (data?.top_repos || []).map((r, i) => (
                  <motion.a
                    key={r.name}
                    href={r.html_url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    whileHover={{ y: -3 }}
                    data-testid={`github-repo-${r.name}`}
                    className="block rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-5 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold truncate">{r.name}</div>
                      <ExternalLink size={14} className="text-muted-foreground" />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                      {r.description || "No description provided."}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs font-mono text-muted-foreground">
                      {r.language && (
                        <span className="inline-flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          {r.language}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1">
                        <Star size={12} /> {r.stars}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GitFork size={12} /> {r.forks}
                      </span>
                    </div>
                  </motion.a>
                ))}
            {!loading && (data?.top_repos || []).length === 0 && (
              <div className="col-span-full text-sm text-muted-foreground">
                No public repositories found yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/40 py-3">
      <div className="text-lg font-bold text-emerald-400">{value}</div>
      <div className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider">
        {label}
      </div>
    </div>
  );
}
