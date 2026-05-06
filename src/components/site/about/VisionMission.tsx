import { motion } from "framer-motion";
import { Globe, Rocket } from "lucide-react";

const VisionMission = () => {
  return (
    <section className="py-24 container-px mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          What Drives Us
        </span>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-5xl">
          Purpose-built for the <span className="text-gradient-gold">future</span>
        </h2>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="group relative rounded-3xl border border-border bg-card p-10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <Globe size={26} />
            </div>
            <h3 className="mt-7 font-display text-2xl font-semibold">Our Vision</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              To become a globally trusted leader in telecom tower engineering by delivering innovative, reliable, and future-ready structural solutions that strengthen modern connectivity infrastructure.
            </p>
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="group relative rounded-3xl border border-border bg-card p-10 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-500 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-highlight/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
              <Rocket size={26} />
            </div>
            <h3 className="mt-7 font-display text-2xl font-semibold">Our Mission</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our mission is to provide precise, efficient, and technology-driven engineering solutions for telecom infrastructure through advanced analysis, simulation, and client-focused execution while maintaining the highest standards of safety and quality.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMission;
