import { motion } from "framer-motion";
import { Database, LineChart, Cpu, Settings2, PackageCheck } from "lucide-react";

const steps = [
  { icon: Database, title: "Data Collection", desc: "On-site survey, drone photogrammetry & LiDAR scans capture every asset." },
  { icon: LineChart, title: "Analysis", desc: "Structural mathematicians model loads against TIA-222 and local codes." },
  { icon: Cpu, title: "Simulation", desc: "FEA & CFD reveal wind, seismic and fatigue performance under 50-year scenarios." },
  { icon: Settings2, title: "Optimization", desc: "We engineer the leanest retrofit — minimum steel, maximum integrity." },
  { icon: PackageCheck, title: "Delivery", desc: "Stamped drawings, BOM and digital twin handed to your construction team." },
];

const Process = () => {
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />

      <div className="relative container-px mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full glass px-3 py-1 text-xs text-primary">
            Our process
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            From survey to{" "}
            <span className="text-gradient-fire">stamped drawing</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Five rigorous phases. Average turnaround of 14 business days.
          </p>
        </div>

        <div className="relative mt-20">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent lg:block" />

          <div className="space-y-12 lg:space-y-20">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isRight = i % 2 === 1;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative grid gap-6 lg:grid-cols-2 lg:items-center ${isRight ? "lg:[&>*:first-child]:order-2" : ""}`}
                >
                  <div className={`lg:px-12 ${isRight ? "lg:text-left" : "lg:text-right"}`}>
                    <div className={`inline-flex items-center gap-3 ${isRight ? "" : "lg:flex-row-reverse"}`}>
                      <span className="font-display text-xs text-muted-foreground">
                        Phase 0{i + 1}
                      </span>
                      <span className="h-px w-12 bg-primary/40" />
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-md text-muted-foreground lg:max-w-none lg:ml-auto">
                      {step.desc}
                    </p>
                  </div>

                  <div className="relative grid place-items-center lg:px-12">
                    <div className="absolute h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
                    <div className="relative grid h-20 w-20 place-items-center rounded-2xl glass border-gradient">
                      <Icon size={28} className="text-primary" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
