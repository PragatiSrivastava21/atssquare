import { motion } from "framer-motion";
import { Database, LineChart, Cpu, Settings2, PackageCheck, ShieldCheck } from "lucide-react";

const steps = [
{
  icon: Database,
  title: "Data Collection",
  desc: `Collecting comprehensive data from tower owners, clients, and tower manufacturers
  , including technical specifications, structural details, site conditions, and high-resolution photographs.
   This information helps ensure accurate analysis, efficient project planning, and reliable engineering assessments tailored to real-world tower infrastructure requirements.`,
},
  { icon: LineChart, title: "Analysis", desc: "Structural engineering model these structure in the commonly used industry software using TIA-222 amd local codes" },
  { icon: Cpu, title: "Simulation", desc: "Finite Element Analysis (FEA) & Computational Fluid Dynamics (CFD) reveal wind, seismic and fatigue performance under 50-year scenarios." },
  { icon: Settings2, title: "Optimization", desc: "We engineer the leanest retrofit — minimum steel, maximum integrity." },
  { icon: ShieldCheck, title: "Rigorous Quality Check", desc: "Every job performed goes through our quality team to perform detail, check of calculation." },
  { icon: PackageCheck, title: "Delivery", desc: "Stamped drawings, BOM  handed to your construction team." },
];

const Process = () => {
  return (
    <section className="relative py-24 md:py-32 bg-background">
      <div className="relative container-px mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Our process
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl text-foreground">
            From structural calculations to{" "}
            <span className="text-gradient-fire">approved designs</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Five rigorous phases. Average turnaround of 14 business days.
          </p>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/20 to-transparent lg:block" />

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
                      <span className="h-px w-12 bg-primary/30" />
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-semibold md:text-3xl text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-md text-muted-foreground lg:max-w-none lg:ml-auto">
                      {step.desc}
                    </p>
                  </div>

                  <div className="relative grid place-items-center lg:px-12">
                    <div className="absolute h-32 w-32 rounded-full bg-primary/5 blur-2xl" />
                    <div className="group relative grid h-20 w-20 place-items-center rounded-2xl border border-border bg-blue-900 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-yellow-600">
                      <Icon size={28} className="text-white transition-colors duration-300 group-hover:text-yellow-600" />
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
