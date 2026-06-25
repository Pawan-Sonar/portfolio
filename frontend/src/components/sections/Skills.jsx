import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/sections/About";
import {
  Code2,
  Server,
  Database,
  Container,
  ShieldCheck,
  Terminal,
} from "lucide-react";

const catIcons = {
  Frontend: Code2,
  Backend: Server,
  Databases: Database,
  DevOps: Container,
  Cybersecurity: ShieldCheck,
  Languages: Terminal,
};

export default function Skills() {
  const cats = Object.entries(portfolioData.skills);
  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader
          number="02"
          label="skills"
          title="The stack I build with."
          subtitle="A pragmatic, opinionated toolkit chosen for shipping production software fast and safely."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cats.map(([cat, items], idx) => {
            const Icon = catIcons[cat] || Code2;
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                whileHover={{ y: -4 }}
                data-testid={`skills-card-${cat.toLowerCase()}`}
                className="rounded-3xl border border-border bg-card/40 backdrop-blur-xl p-6 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-emerald-400 uppercase">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="font-semibold">{cat}</div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      data-testid={`skill-pill-${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      className="text-xs font-mono px-2.5 py-1 rounded-full border border-border bg-secondary/40 hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Proficiency bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-10 rounded-3xl border border-border bg-card/40 backdrop-blur-xl p-8"
          data-testid="proficiency-card"
        >
          <h3 className="text-lg font-semibold mb-6">Proficiency</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
            {portfolioData.proficiency.map((p, i) => (
              <div key={p.name} data-testid={`proficiency-row-${i}`}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{p.name}</span>
                  <span className="font-mono text-emerald-400">
                    {p.level}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.level}%` }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.2, delay: 0.1 + i * 0.1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
