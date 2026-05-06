import { motion } from "framer-motion";
import { User } from "lucide-react";

const CEOSection = () => {
  return (
    <section className="py-20 md:py-28 container-px mx-auto">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent mb-5">
            Leadership
          </span>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
            Meet Our <span className="text-gradient-hero">CEO</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground max-w-xl">
            At ATSS, our vision is to redefine telecom infrastructure engineering
            through innovation, precision, and reliability. Under the leadership of
            our CEO, the company continues to deliver advanced tower structural
            solutions that help build stronger and smarter connectivity networks.
            Our focus is not only on engineering excellence but also on creating
            long-term value for clients through technology-driven solutions.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-12 bg-accent" />
            <div>
              <p className="font-display text-lg font-semibold text-foreground">
                Chief Executive Officer
              </p>
              <p className="text-sm text-muted-foreground">
                Advanced Tower Structural Solutions
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)] overflow-hidden border-gradient">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/40">
              <User size={64} strokeWidth={1} />
              <span className="mt-3 text-xs font-medium tracking-wide uppercase">
                CEO Portrait
              </span>
            </div>
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CEOSection;
