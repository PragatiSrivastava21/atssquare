import { motion } from "framer-motion";
import { Activity, Layers, Building2, Antenna, Wind, Settings } from "lucide-react";

const services = [
  {
    icon: Activity,
    title: "Tower Structural Analysis",
    desc: "Comprehensive structural assessment ensuring safety and compliance with international standards.",
  },
  {
    icon: Settings,
    title: "Fatigue Analysis",
    desc: "Evaluating long-term material behavior under cyclic loading to prevent structural failure.",
  },
  {
    icon: Layers,
    title: "Foundation Analysis",
    desc: "Geotechnical-driven foundation review, retrofit and uplift assessment for all tower types.",
  },
  {
    icon: Antenna,
    title: "Antenna Mount Analysis",
    desc: "Mount capacity evaluation and reinforcement design for 5G and next-gen equipment.",
  },
  {
    icon: Wind,
    title: "FEA / CFD Simulation",
    desc: "High-fidelity finite element and computational fluid dynamics for wind and seismic events.",
  },
  {
    icon: Building2,
    title: "Telecom Infrastructure Optimization",
    desc: "End-to-end solutions to maximize network capacity while minimizing structural risk.",
  },
];

const WhatWeDoSection = () => {
  return (
    <section className="py-20 md:py-28 container-px mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4">
          Capabilities
        </span>
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
          What We <span className="text-gradient-hero">Do</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
          Engineering solutions that power the networks of tomorrow.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="group rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-all duration-500 hover:shadow-[var(--shadow-elevated)] hover:border-primary/40 hover:-translate-y-1"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                <Icon size={20} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WhatWeDoSection;
