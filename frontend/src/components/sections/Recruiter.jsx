import { motion } from "framer-motion";
import { CheckCircle2, Rocket } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/sections/About";

export default function Recruiter() {
  return (
    <section
      id="recruiter"
      data-testid="recruiter-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader
          number="08"
          label="for recruiters"
          title="Why hire me?"
          subtitle="A snapshot of the value I'd bring to your engineering team from day one."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            data-testid="recruiter-points-card"
            className="lg:col-span-7 rounded-3xl border border-border bg-card/40 backdrop-blur-xl p-8 md:p-10"
          >
            <ul className="space-y-4">
              {portfolioData.recruiterPoints.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="text-emerald-400 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-base">{p}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            data-testid="recruiter-cta-card"
            className="lg:col-span-5 relative rounded-3xl p-8 md:p-10 overflow-hidden border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/15 via-background to-cyan-500/10 shadow-[0_0_60px_rgba(16,185,129,0.2)]"
          >
            <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-emerald-500/30 blur-[80px]" />
            <Rocket size={28} className="text-emerald-400 relative" />
            <h3 className="mt-5 text-2xl font-bold leading-tight relative">
              Open to roles starting{" "}
              <span className="text-gradient-emerald">May 2026</span>
            </h3>
            <p className="mt-3 text-sm text-muted-foreground relative">
              Available for full-time positions as:
            </p>
            <div className="mt-4 flex flex-wrap gap-2 relative">
              {portfolioData.roles.map((r) => (
                <span
                  key={r}
                  data-testid={`recruiter-role-${r.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-xs font-mono px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                >
                  {r}
                </span>
              ))}
            </div>
            <a
              href="#contact"
              data-testid="recruiter-cta-contact"
              className="mt-7 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-colors relative"
            >
              Reach out
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
