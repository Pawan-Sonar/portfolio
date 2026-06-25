import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="border-t border-border mt-12"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold font-mono text-sm flex items-center justify-center">
              PS
            </span>
            <div>
              <div className="font-semibold">Pawan D. Sonar</div>
              <div className="text-xs font-mono text-muted-foreground">
                software_developer.exe
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Full Stack Developer & Cybersecurity Enthusiast based in Thane,
            India.
          </p>
        </div>

        <div>
          <div className="text-xs font-mono uppercase text-emerald-400 tracking-wider mb-3">
            Navigate
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            {["about", "skills", "projects", "experience", "achievements", "contact"].map(
              (id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="hover:text-emerald-400 transition-colors capitalize"
                >
                  {id}
                </a>
              )
            )}
          </div>
        </div>

        <div>
          <div className="text-xs font-mono uppercase text-emerald-400 tracking-wider mb-3">
            Connect
          </div>
          <div className="flex gap-3">
            <a
              href={portfolioData.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              data-testid="footer-github-link"
              className="w-10 h-10 rounded-full border border-border hover:border-emerald-500/40 hover:text-emerald-400 transition-colors inline-flex items-center justify-center"
            >
              <Github size={16} />
            </a>
            <a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              data-testid="footer-linkedin-link"
              className="w-10 h-10 rounded-full border border-border hover:border-emerald-500/40 hover:text-emerald-400 transition-colors inline-flex items-center justify-center"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${portfolioData.email}`}
              aria-label="Email"
              data-testid="footer-email-link"
              className="w-10 h-10 rounded-full border border-border hover:border-emerald-500/40 hover:text-emerald-400 transition-colors inline-flex items-center justify-center"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-muted-foreground">
          <span>© {new Date().getFullYear()} Pawan D. Sonar. All rights reserved.</span>
          <span className="inline-flex items-center gap-1.5">
            Built with <Heart size={12} className="text-emerald-400 fill-emerald-400" /> in
            India
          </span>
        </div>
      </div>
    </footer>
  );
}
