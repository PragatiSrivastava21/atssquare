import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="relative pb-10 sm:pb-15">
      <div className="container-px mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-foreground p-6 sm:p-10 md:p-16 lg:p-20 text-white"
        >
          {/* Glow blobs */}
          <div className="absolute -top-32 -left-32 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-accent/20 blur-[100px] sm:blur-[120px]" />
          <div className="absolute -bottom-32 -right-32 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-primary/20 blur-[100px] sm:blur-[120px]" />

          <div className="relative grid gap-8 sm:gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            {/* Left: Copy */}
            <div>
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-accent border border-white/10">
                Let's build
              </span>
              <h2 className="mt-4 sm:mt-5 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight">
                Let's build reliable{" "}
                <span className="text-gradient-gold">infrastructure</span>{" "}
                together.
              </h2>
              <p className="mt-4 sm:mt-6 max-w-xl text-white/70 text-sm sm:text-base md:text-lg leading-relaxed">
                Tell us about your network. We'll respond within one business
                day with a scoped proposal.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-[hsl(44,80%,58%)] px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-semibold text-white shadow-[var(--glow-gold)] transition-all hover:shadow-[0_0_60px_hsl(44,65%,52%/0.5)] whitespace-nowrap"
                >
                  Start a project <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right: Timeline rows */}
            <div className="grid gap-3 sm:gap-4">
              {[
                { k: "Avg. response", v: "< 24 hours" },
                { k: "Scoped proposal", v: "3 business days" },
                { k: "Project kickoff", v: "1 week" },
              ].map((row) => (
                <div
                  key={row.k}
                  className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 sm:px-5 py-3.5 sm:py-4 gap-4"
                >
                  <span className="text-xs sm:text-sm text-white/60 shrink-0">{row.k}</span>
                  <span className="font-display font-semibold text-gradient-gold text-sm sm:text-base text-right">
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
