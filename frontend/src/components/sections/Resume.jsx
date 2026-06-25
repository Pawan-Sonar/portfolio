import { motion } from "framer-motion";
import { FileText, Download, Eye } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/sections/About";

export default function Resume() {
  return (
    <section
      id="resume"
      data-testid="resume-section"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionHeader
          number="07"
          label="resume"
          title="Grab the full picture."
          subtitle="Download my latest resume — built for recruiters who scan in under 30 seconds."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-14 rounded-3xl border border-border bg-card/40 backdrop-blur-xl p-8 md:p-12 relative overflow-hidden"
          data-testid="resume-card"
        >
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-[100px]" />

          <div className="grid md:grid-cols-12 gap-8 items-center relative">
            <div className="md:col-span-3 flex justify-center">
              <div className="relative">
                <div className="w-32 h-40 rounded-xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-cyan-500/5 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                  <FileText size={42} className="text-emerald-400" />
                </div>
                <div className="absolute -bottom-2 -right-2 px-2 py-1 rounded-md text-[10px] font-mono bg-emerald-500 text-black">
                  PDF
                </div>
              </div>
            </div>

            <div className="md:col-span-9">
              <h3 className="text-2xl font-bold">Pawan_Sonar_Resume.pdf</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Software Developer · Full Stack · Cybersecurity · Updated for{" "}
                {new Date().getFullYear()}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={portfolioData.resumeUrl}
                  download
                  data-testid="resume-download-button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-colors"
                >
                  <Download size={16} /> Download Resume
                </a>
                <a
                  href={portfolioData.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="resume-view-button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
                >
                  <Eye size={16} /> View Resume
                </a>
              </div>
              <p className="mt-4 text-[11px] font-mono text-muted-foreground">
                {"// "}upload your final PDF to /app/frontend/public/resume/Pawan_Sonar_Resume.pdf
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
