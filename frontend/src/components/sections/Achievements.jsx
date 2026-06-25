import { motion } from "framer-motion";
import { Award, ShieldCheck, Languages, Trophy, Medal } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/sections/About";

const iconMap = { Award, ShieldCheck, Languages, Trophy, Medal };

export default function Achievements() {
  return (
    <section
      id="achievements"
      data-testid="achievements-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader
          number="05"
          label="achievements"
          title="Certifications & milestones."
          subtitle="Continuous learning, plus a few well-earned trophies along the way."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioData.achievements.map((a, i) => {
            const Icon = iconMap[a.icon] || Award;
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                data-testid={`achievement-card-${i}`}
                className="rounded-2xl border border-border bg-card/40 backdrop-blur-xl p-6 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {a.year}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold leading-snug">
                  {a.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{a.org}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
