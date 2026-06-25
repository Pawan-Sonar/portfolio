import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Images } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/sections/About";

export default function Projects() {
  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader
          number="04"
          label="featured projects"
          title="Production-grade work."
          subtitle="Two flagship projects spanning AI-augmented finance and SOC-style cybersecurity tooling."
        />

        <div className="mt-14 space-y-10">
          {portfolioData.projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const reverse = index % 2 === 1;
  const accentRing =
    project.accent === "cyan"
      ? "from-cyan-400/30 to-emerald-500/20"
      : "from-emerald-500/30 to-cyan-400/20";

  const shots = project.screenshots || [{ src: project.image, label: project.name }];
  const [active, setActive] = useState(0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      data-testid={`project-card-${project.name.toLowerCase().replace(/\s+/g, "-")}`}
      className="group relative rounded-3xl border border-border bg-card/30 backdrop-blur-xl overflow-hidden hover:border-emerald-500/40 transition-all"
    >
      <div className={`grid lg:grid-cols-12 gap-0 ${reverse ? "lg:[direction:rtl]" : ""}`}>
        <div className="lg:col-span-7 relative lg:[direction:ltr] bg-black/40">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${accentRing} opacity-20 pointer-events-none`}
          />
          <div className="relative aspect-[16/10] overflow-hidden">
            <motion.img
              key={shots[active].src}
              src={shots[active].src}
              alt={`${project.name} - ${shots[active].label}`}
              loading="lazy"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-emerald-400">
              0{index + 1} / {project.category}
            </div>
            {shots.length > 1 && (
              <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/80">
                <Images size={11} /> {active + 1} / {shots.length}
              </div>
            )}
            <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/90">
              {shots[active].label}
            </div>
          </div>

          {shots.length > 1 && (
            <div
              data-testid={`project-thumbs-${project.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex gap-2 p-3 overflow-x-auto scrollbar-hide bg-black/30 border-t border-border"
            >
              {shots.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setActive(i)}
                  data-testid={`project-thumb-${project.name.toLowerCase().replace(/\s+/g, "-")}-${i}`}
                  className={`relative flex-shrink-0 w-24 aspect-[16/10] rounded-md overflow-hidden border-2 transition-all ${
                    active === i
                      ? "border-emerald-400 ring-2 ring-emerald-500/30"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`View ${s.label}`}
                >
                  <img
                    src={s.src}
                    alt={s.label}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 p-8 md:p-10 flex flex-col lg:[direction:ltr]">
          <h3 className="text-3xl font-bold tracking-tight">{project.name}</h3>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.highlights.map((h) => (
              <span
                key={h}
                className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
              >
                {h}
              </span>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider mb-2">
              Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary/60 border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              data-testid={`project-demo-${project.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-black text-sm font-medium hover:bg-emerald-400 transition-colors"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
            <a
              href={project.code}
              target="_blank"
              rel="noreferrer"
              data-testid={`project-code-${project.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-emerald-500/40 hover:text-emerald-400 text-sm transition-colors"
            >
              <Github size={14} /> Repository
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
