import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section id="contact" className="relative py-24 md:py-36">
      <div className="container-px mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-card p-10 md:p-20"
        >
          {/* Decorative glows */}
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-highlight/20 blur-[120px]" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" />
          <div className="absolute inset-0 grid-bg opacity-40" />

          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <span className="inline-block rounded-full glass px-3 py-1 text-xs text-primary">
                Let's build
              </span>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
                Let's build reliable{" "}
                <span className="text-gradient-hero">infrastructure</span>{" "}
                together.
              </h2>
              <p className="mt-6 max-w-xl text-muted-foreground md:text-lg">
                Tell us about your network. We'll respond within one business
                day with a scoped proposal.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="hero" size="xl">
                  Start a project <ArrowRight size={16} />
                </Button>
                <Button variant="glass" size="xl">
                  Book a 30-min call
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {[
                { k: "Avg. response", v: "< 24 hours" },
                { k: "Scoped proposal", v: "3 business days" },
                { k: "Project kickoff", v: "1 week" },
              ].map((row) => (
                <div
                  key={row.k}
                  className="flex items-center justify-between rounded-xl glass px-5 py-4"
                >
                  <span className="text-sm text-muted-foreground">{row.k}</span>
                  <span className="font-display font-semibold text-gradient-gold">
                    {row.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
