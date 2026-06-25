import { motion } from "framer-motion";
import {
  Layers,
  ShieldCheck,
  Cloud,
  BarChart3,
  GraduationCap,
  Briefcase,
  Target,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const iconMap = { Layers, ShieldCheck, Cloud, BarChart3 };

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader number="01" label="about" title="A developer building real things." />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl border border-border bg-card/40 backdrop-blur-xl p-8 md:p-10"
            data-testid="about-summary-card"
          >
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              {portfolioData.about.summary}
            </p>
            <p className="mt-5 text-sm font-mono text-emerald-400">
              {"// "}
              {portfolioData.about.career_goal}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 rounded-3xl border border-border bg-card/40 backdrop-blur-xl p-8"
            data-testid="about-education-card"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <GraduationCap size={20} />
              </div>
              <div>
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  Education
                </div>
                <h3 className="mt-1 text-lg font-semibold">
                  {portfolioData.education.degree}
                </h3>
                <div className="text-sm text-muted-foreground">
                  {portfolioData.education.school}
                </div>
                <div className="text-xs font-mono text-muted-foreground mt-1">
                  Graduating {portfolioData.education.graduation}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Briefcase size={20} />
              </div>
              <div>
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  Internship
                </div>
                <h3 className="mt-1 text-lg font-semibold">
                  Software Developer Intern · Seema Systems
                </h3>
                <div className="text-xs font-mono text-muted-foreground mt-1">
                  June 2025 – September 2025
                </div>
              </div>
            </div>
          </motion.div>

          {portfolioData.about.pillars.map((p, i) => {
            const Icon = iconMap[p.icon] || Target;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                whileHover={{ y: -4 }}
                data-testid={`about-pillar-${p.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="lg:col-span-3 rounded-3xl border border-border bg-card/40 backdrop-blur-xl p-6 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all"
              >
                <Icon size={22} className="text-emerald-400" />
                <h4 className="mt-4 text-base font-semibold">{p.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ number, label, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl"
    >
      <div className="flex items-center gap-3 text-xs font-mono text-emerald-400 uppercase tracking-[0.2em]">
        <span>{number}</span>
        <span className="h-px w-12 bg-emerald-500/40" />
        <span>{label}</span>
      </div>
      <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground max-w-2xl">{subtitle}</p>
      )}
    </motion.div>
  );
}
