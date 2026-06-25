import { motion } from "framer-motion";
import { Download, ArrowDown, Mail, MapPin, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const heroBg =
  "https://images.unsplash.com/photo-1557264322-b44d383a2906?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjB0ZXh0dXJlJTIwbGlxdWlkfGVufDB8fHx8MTc4MjM4OTE3M3ww&ixlib=rb-4.1.0&q=85";

export default function Hero() {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-30 dark:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="absolute inset-0 grid-bg dark:opacity-100 opacity-40" />
      </div>

      {/* Floating glow orbs */}
      <motion.div
        aria-hidden
        className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-emerald-500/20 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[140px]"
        animate={{ x: [0, -40, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      <div className="max-w-7xl w-full mx-auto px-6 md:px-10 grid lg:grid-cols-12 gap-12 items-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            data-testid="hero-availability-badge"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs font-mono"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
              <span className="relative rounded-full w-2 h-2 bg-emerald-400" />
            </span>
            Available for opportunities · Graduating May 2026
          </motion.div>

          <h1
            data-testid="hero-name"
            className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="block"
            >
              Pawan D. Sonar
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="block text-gradient-emerald"
            >
              Software Developer.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            data-testid="hero-tagline"
            className="mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
          >
            {portfolioData.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <Sparkles size={12} className="text-emerald-400" />
              Full Stack
            </span>
            <span className="text-border">/</span>
            <span>Cybersecurity</span>
            <span className="text-border">/</span>
            <span>Cloud & DevOps</span>
            <span className="text-border">/</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={12} /> Thane, India
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              data-testid="hero-view-projects-button"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              View Projects
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </a>
            <a
              href={portfolioData.resumeUrl}
              download
              data-testid="hero-download-resume-button"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
            >
              <Download size={16} /> Download Resume
            </a>
            <a
              href="#contact"
              data-testid="hero-contact-button"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
            >
              <Mail size={16} /> Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* Avatar card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-4 relative"
        >
          <div className="relative aspect-square max-w-sm mx-auto">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/30 to-cyan-500/20 blur-2xl" />
            <div className="relative w-full h-full rounded-3xl border border-emerald-500/30 bg-background/70 backdrop-blur-2xl flex flex-col items-center justify-center p-8 glow-emerald overflow-hidden">
              <div className="absolute top-4 left-4 right-4 flex items-center gap-1.5 opacity-70">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                <span className="ml-auto text-[10px] font-mono text-muted-foreground">
                  ~/portfolio
                </span>
              </div>

              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(16,185,129,0.3)",
                    "0 0 0 20px rgba(16,185,129,0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-emerald-500 to-cyan-400 ring-2 ring-emerald-400/60"
              >
                <img
                  src="/avatar.png"
                  alt="Pawan D. Sonar"
                  data-testid="hero-avatar-photo"
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <div className="mt-6 text-center">
                <div className="text-sm font-mono text-emerald-400">
                  $ whoami
                </div>
                <div className="mt-1 text-lg font-semibold">Pawan Sonar</div>
                <div className="text-xs text-muted-foreground mt-1 font-mono">
                  B.Sc IT · Mumbai University
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 w-full text-center">
                <div>
                  <div className="text-lg font-bold text-emerald-400">2+</div>
                  <div className="text-[10px] text-muted-foreground font-mono">
                    Projects
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-emerald-400">4mo</div>
                  <div className="text-[10px] text-muted-foreground font-mono">
                    Intern
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-emerald-400">6+</div>
                  <div className="text-[10px] text-muted-foreground font-mono">
                    Certs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll down"
        data-testid="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1, y: { duration: 2, repeat: Infinity } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-emerald-400"
      >
        <ArrowDown size={18} />
      </motion.a>
    </section>
  );
}
