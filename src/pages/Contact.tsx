import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  useLenis();
  const [submitted, setSubmitted] = useState(false);

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
                <p className="mt-2 text-muted-foreground">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-foreground">Name</label>
                    <input
                      required
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Company</label>
                    <input
                      className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Company name"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input
                    required
                    type="email"
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <textarea
                    required
                    rows={5}
                    className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <Button type="submit" className="w-full rounded-xl py-3">
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              { icon: Mail, label: "Email", value: "engineering@atss.com" },
              { icon: Phone, label: "Phone", value: "+1 (555) 234-5678" },
              { icon: MapPin, label: "Office", value: "1200 Tower Drive, Suite 400\nDallas, TX 75201" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
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
                  { k: "Avg. response", v: "< 24 hours" },
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
      </section>
      <Footer />
    </main>
  );
};

export default Contact;
