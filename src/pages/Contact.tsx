// src/pages/Contact.tsx
import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL as string;

type Status = "idle" | "sending" | "error";

interface FormData {
  from_name: string;
  company: string;
  from_email: string;
  message: string;
}

const Contact = () => {
  useLenis();

  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState<FormData>({
    from_name: "",
    company: "",
    from_email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(form),
      });

      setStatus("idle");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-20 container-px mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-14"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Contact Us
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Let's build reliable{" "}
            <span className="text-gradient-hero">infrastructure</span> together.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Tell us about your network. We'll respond within one business day with a scoped proposal.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]"
          >
            {submitted ? (
              <div className="py-16 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="font-display text-2xl font-semibold">Thank you!</h3>
                <p className="mt-2 text-muted-foreground">
                  We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Row: Name + Company */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Name
                    </label>
                    <input
                      required
                      name="from_name"
                      value={form.from_name}
                      onChange={handleChange}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Company
                    </label>
                    <input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Company name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    required
                    name="from_email"
                    type="email"
                    value={form.from_email}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="you@company.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Error message */}
                {status === "error" && (
                  <p className="text-sm text-destructive">
                    Something went wrong. Please try again.
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-xl py-3"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </Button>

              </form>
            )}
          </motion.div>

          {/* ── Right column — unchanged ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              { icon: Mail,   label: "Email",  value: "engineering@atss.com" },
              { icon: Phone,  label: "Phone",  value: "+1 (555) 234-5678" },
              { icon: MapPin, label: "Office", value: "1200 Tower Drive, Suite 400\nDallas, TX 75201" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{c.label}</div>
                    <div className="mt-1 text-sm text-muted-foreground whitespace-pre-line">{c.value}</div>
                  </div>
                </div>
              );
            })}

            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="font-display text-lg font-semibold">Response Timeline</h3>
              <div className="mt-4 space-y-3">
                {[
                  { k: "Avg. response",   v: "< 24 hours" },
                  { k: "Scoped proposal", v: "3 business days" },
                  { k: "Project kickoff", v: "1 week" },
                ].map((row) => (
                  <div key={row.k} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{row.k}</span>
                    <span className="font-semibold text-primary">{row.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Map section — unchanged ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20"
        >
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Find Us
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Our <span className="text-gradient-hero">Location</span>
              </h2>
              <p className="mt-2 text-muted-foreground max-w-md">
                Visit our headquarters in Dallas, or reach out to schedule a site visit anywhere in the region.
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=1200+Tower+Drive,+Dallas,+TX+75201"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-card border border-border px-5 py-2.5 text-sm font-medium text-foreground shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-0.5 transition-all duration-300 shrink-0"
            >
              Get Directions
              <ArrowUpRight size={16} className="text-primary" />
            </a>
          </div>

          <div className="relative rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden hover:shadow-[var(--shadow-elevated)] transition-shadow duration-500">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.0!2d-96.8!3d32.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQ2JzQwLjgiTiA5NsKwNDgnMDAuMCJX!5e0!3m2!1sen!2sus!4v1"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ATSS Office Location"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
              />
            </div>
            <div className="flex items-center justify-between px-6 py-4 bg-card border-t border-border">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">ATSS Engineering HQ</div>
                  <div className="text-xs text-muted-foreground">1200 Tower Drive, Suite 400, Dallas, TX</div>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=1200+Tower+Drive,+Dallas,+TX+75201"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-4 py-2 text-xs font-medium text-primary hover:bg-primary/15 transition-colors"
              >
                Open in Maps
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
};

export default Contact;