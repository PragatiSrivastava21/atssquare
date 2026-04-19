import { motion } from "framer-motion";
import { Activity, Building2, Antenna, Layers, Wind, Bot, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const services = [
  {
    icon: Activity,
    title: "Tower Structural Analysis",
    desc: "TIA-222-H compliant assessment of existing towers under current and future load profiles.",
    code: "01",
  },
  {
    icon: Building2,
    title: "New Tower Design",
    desc: "Self-supporting, monopole and guyed designs engineered for terrain, climate and growth.",
    code: "02",
  },
  {
    icon: Antenna,
    title: "Antenna Mount Analysis",
    desc: "Mount capacity, modification design and reinforcement for 5G and mmWave equipment.",
    code: "03",
  },
  {
    icon: Layers,
    title: "Foundation Analysis",
    desc: "Geotechnical-driven foundation review, retrofit and uplift / overturning assessment.",
    code: "04",
  },
  {
    icon: Wind,
    title: "FEA / CFD Simulation",
    desc: "High-fidelity finite element and computational fluid dynamics for wind & seismic events.",
    code: "05",
  },
  {
    icon: Bot,
    title: "AI Inspection Tools",
    desc: "Drone-fed computer vision detects corrosion, bolt fatigue and weld defects in minutes.",
    code: "06",
  },
];

const Services = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[140px]" />

      <div className="relative container-px mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full glass px-3 py-1 text-xs text-primary">
              What we do
            </span>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              A full-stack engineering practice for{" "}
              <span className="text-gradient-gold">wireless infrastructure.</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Six disciplines, one team. From the bolt to the byte — we engineer
            every layer that keeps networks online.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            const isActive = active === i;
            return (
              <motion.button
                key={s.title}
                type="button"
                onClick={() => setActive(isActive ? null : i)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-card p-7 text-left transition-all duration-500 hover:border-primary/40 hover:shadow-elevated hover:-translate-y-1"
              >
                {/* Glow on hover */}
                <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-primary/0 blur-3xl transition-all duration-500 group-hover:bg-primary/20" />

                <div className="relative flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary/60 text-primary transition-all group-hover:bg-gradient-gold group-hover:text-primary-foreground group-hover:shadow-glow-gold">
                    <Icon size={20} />
                  </div>
                  <span className="font-display text-xs text-muted-foreground">{s.code}</span>
                </div>

                <h3 className="relative mt-6 font-display text-xl font-semibold">
                  {s.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="relative mt-5 border-t border-border/50 pt-5 text-sm text-foreground/80"
                  >
                    Includes deliverables: detailed engineering report,
                    stamped drawings, modification recommendations and a 3D
                    digital twin of the asset.
                  </motion.div>
                )}

                <div className="relative mt-6 flex items-center gap-2 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  <span>{isActive ? "Show less" : "Learn more"}</span>
                  <ArrowUpRight size={14} />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
