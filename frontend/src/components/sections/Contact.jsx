import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { portfolioData } from "@/data/portfolio";
import { SectionHeader } from "@/components/sections/About";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2)
      e.name = "Name must be at least 2 characters";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.message || form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await axios.post(`${API}/contact`, form, { timeout: 15000 });
      setSent(true);
      toast.success(
        res.data?.email_delivered
          ? "Message sent! I'll get back to you soon."
          : "Message received! I'll follow up soon."
      );
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Could not send. Please try again or email me directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-24 md:py-32"
    >
      <Toaster theme="dark" position="top-right" richColors />
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeader
          number="09"
          label="contact"
          title="Let's build something."
          subtitle="Whether it's a role, a project, or just a hello — drop a line."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-3xl border border-border bg-card/40 backdrop-blur-xl p-8 space-y-5"
            data-testid="contact-info-card"
          >
            <ContactLink
              icon={<Mail size={18} />}
              label="Email"
              value={portfolioData.email}
              href={`mailto:${portfolioData.email}`}
              testId="contact-email-link"
            />
            <ContactLink
              icon={<Github size={18} />}
              label="GitHub"
              value="@Pawan-Sonar"
              href={portfolioData.github}
              testId="contact-github-link"
            />
            <ContactLink
              icon={<Linkedin size={18} />}
              label="LinkedIn"
              value="pawan-sonar"
              href={portfolioData.linkedin}
              testId="contact-linkedin-link"
            />
            <ContactLink
              icon={<MapPin size={18} />}
              label="Location"
              value={portfolioData.location}
              testId="contact-location"
            />

            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                Response time
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Usually within 24 hours.
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={onSubmit}
            className="lg:col-span-7 rounded-3xl border border-border bg-card/40 backdrop-blur-xl p-8 md:p-10"
            data-testid="contact-form"
          >
            <Field
              label="Your name"
              error={errors.name}
              testId="contact-name-input"
            >
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Doe"
                data-testid="contact-name-input"
                className="w-full bg-transparent border-0 border-b border-border focus:border-emerald-500 outline-none py-2 transition-colors"
              />
            </Field>

            <Field
              label="Email"
              error={errors.email}
              testId="contact-email-input"
            >
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jane@company.com"
                data-testid="contact-email-input"
                className="w-full bg-transparent border-0 border-b border-border focus:border-emerald-500 outline-none py-2 transition-colors"
              />
            </Field>

            <Field
              label="Message"
              error={errors.message}
              testId="contact-message-input"
            >
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about the role or project…"
                data-testid="contact-message-input"
                className="w-full bg-transparent border border-border rounded-xl focus:border-emerald-500 outline-none p-3 transition-colors resize-none"
              />
            </Field>

            <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
              <p className="text-xs font-mono text-muted-foreground">
                {"// "}your message goes straight to my inbox
              </p>
              <button
                type="submit"
                disabled={submitting}
                data-testid="contact-submit-button"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-black font-medium hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending…
                  </>
                ) : sent ? (
                  <>
                    <CheckCircle2 size={16} /> Sent
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send message
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ icon, label, value, href, testId }) {
  const inner = (
    <div className="flex items-center gap-4 group">
      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider">
          {label}
        </div>
        <div className="text-sm font-medium group-hover:text-emerald-400 transition-colors">
          {value}
        </div>
      </div>
    </div>
  );
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      data-testid={testId}
      className="block"
    >
      {inner}
    </a>
  ) : (
    <div data-testid={testId}>{inner}</div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="mb-6">
      <div className="text-xs font-mono uppercase text-muted-foreground tracking-wider mb-1">
        {label}
      </div>
      {children}
      {error && (
        <div className="text-xs text-red-400 mt-1.5 font-mono">{error}</div>
      )}
    </div>
  );
}
