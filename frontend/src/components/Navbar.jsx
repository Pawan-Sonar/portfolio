import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { portfolioData } from "@/data/portfolio";

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "recruiter", label: "Hire Me" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = NAV.map((n) => n.id);
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 120 && r.bottom >= 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-background/70 backdrop-blur-2xl border-b border-border"
          : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        <a
          href="#hero"
          data-testid="nav-logo"
          className="flex items-center gap-3 group"
        >
          <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-sm shadow-[0_0_20px_rgba(16,185,129,0.25)]">
            PS
          </span>
          <span className="hidden sm:block">
            <div className="text-sm font-semibold tracking-tight leading-none">
              Pawan Sonar
            </div>
            <div className="text-[11px] font-mono text-muted-foreground mt-0.5">
              software_developer.exe
            </div>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              data-testid={`nav-link-${n.id}`}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                active === n.id
                  ? "text-emerald-400 bg-emerald-500/10"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={portfolioData.github}
            target="_blank"
            rel="noreferrer"
            data-testid="nav-github-link"
            aria-label="GitHub"
            className="hidden sm:inline-flex w-9 h-9 items-center justify-center rounded-full border border-border hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            href={portfolioData.linkedin}
            target="_blank"
            rel="noreferrer"
            data-testid="nav-linkedin-link"
            aria-label="LinkedIn"
            className="hidden sm:inline-flex w-9 h-9 items-center justify-center rounded-full border border-border hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
          >
            <Linkedin size={16} />
          </a>
          <button
            type="button"
            onClick={toggle}
            data-testid="theme-toggle-button"
            aria-label="Toggle theme"
            className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-border hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href="#contact"
            data-testid="nav-hire-cta"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-emerald-500 text-black hover:bg-emerald-400 transition-colors"
          >
            Hire me
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
            className="lg:hidden w-9 h-9 inline-flex items-center justify-center rounded-full border border-border"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            data-testid="mobile-menu"
            className="lg:hidden mt-3 mx-6 rounded-2xl border border-border bg-background/90 backdrop-blur-2xl p-3"
          >
            <div className="flex flex-col">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-nav-link-${n.id}`}
                  className="px-4 py-3 text-sm rounded-xl hover:bg-emerald-500/10 hover:text-emerald-400"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
