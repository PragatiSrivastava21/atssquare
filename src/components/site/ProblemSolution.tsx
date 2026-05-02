import { motion } from "framer-motion";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import wireframe from "@/assets/wireframe-tower.jpg";

const problems = [
  "Aging towers nearing structural fatigue",
  "5G upgrades exceeding original load specs",
  "Wind & seismic risks under-modeled",
  "Manual inspections that miss micro-fractures",
];

const solutions = [
  "Full FEA structural reassessment",
  "Load capacity & retrofit engineering",
  "CFD wind simulations to ASCE/TIA standards",
  "AI-assisted defect detection from drone scans",
];

const ProblemSolution = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-muted/30">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative container-px mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            The challenge
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl text-foreground">
            The infrastructure carrying tomorrow{" "}
            <span className="text-gradient-fire">was built yesterday.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Networks scale faster than the steel that holds them. We close that
            gap with simulation, science and rigorous engineering.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.1fr_1fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center gap-2 text-highlight">
              <AlertTriangle size={18} />
              <span className="text-xs font-medium uppercase tracking-wider">Problems</span>
            </div>
            <ul className="mt-6 space-y-4">
              {problems.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-highlight" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-2xl border border-border bg-card"
          >
            <img
              src={wireframe}
              alt="Structural wireframe analysis"
              loading="lazy"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="text-xs uppercase tracking-wider text-accent">Live FEA</div>
              <div className="mt-1 font-display text-lg font-semibold text-white">
                Stress mesh • 142,000 nodes
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck size={18} />
              <span className="text-xs font-medium uppercase tracking-wider">ATSS Solution</span>
            </div>
            <ul className="mt-6 space-y-4">
              {solutions.map((s) => (
                <li key={s} className="flex gap-3 text-sm text-foreground/80">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
