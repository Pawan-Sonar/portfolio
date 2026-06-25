import { motion } from "framer-motion";
import { CheckCircle2, MapPin, CalendarDays } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/sections/About";

export default function Experience() {
  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader
          number="03"
          label="experience"
          title="Building in industry."
          subtitle="Hands-on internship experience with real product code, real users, and real deadlines."
        />

        <div className="mt-14 relative">
          {/* timeline rail */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-500/40 to-transparent" />

          {portfolioData.experience.map((exp, i) => (
            <motion.div
              key={exp.role + exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              data-testid={`experience-item-${i}`}
              className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-12 mb-10"
            >
              {/* node */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.7)]" />

              <div className="md:text-right md:pr-12">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  {exp.duration}
                </div>
                <h3 className="mt-1 text-xl font-semibold">{exp.role}</h3>
                <div className="text-sm text-muted-foreground">{exp.company}</div>
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                  <MapPin size={12} /> {exp.location}
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:pl-12 rounded-3xl border border-border bg-card/40 backdrop-blur-xl p-6 hover:border-emerald-500/40 transition-colors">
                <ul className="space-y-3">
                  {exp.highlights.map((h, k) => (
                    <li
                      key={k}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-emerald-400 mt-0.5 flex-shrink-0"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {exp.stack.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-border bg-secondary/40 text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
