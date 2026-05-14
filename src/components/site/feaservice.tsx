import { motion } from "framer-motion";
import { ArrowLeft, Cpu, BarChart2, Layers, ZapOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import services6 from "@/assets/fatigue.png";

const highlights = [
  {
    icon: Cpu,
    title: "Stress & Strain Analysis",
    desc: "High-fidelity simulation of stress and strain distributions across structural components under real-world loading.",
  },
  {
    icon: BarChart2,
    title: "Deformation Assessment",
    desc: "Accurate prediction of deflections and deformations to verify serviceability and geometric stability.",
  },
  {
    icon: ZapOff,
    title: "Fatigue Analysis",
    desc: "Evaluation of cyclic loading effects to predict fatigue life and identify potential failure zones before they occur.",
  },
  {
    icon: Layers,
    title: "Connection & Joint Validation",
    desc: "Detailed FEA of bolted/welded connections, base plates, gussets, and brackets to validate safety margins.",
  },
];

const FeaService = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[800px] overflow-hidden">
        <img
          src={services6}
          alt="Finite Element Analysis"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative flex h-full flex-col items-start justify-center container-px mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Services
          </motion.button>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-medium tracking-widest text-yellow-400 uppercase mb-3"
          >
            Service 08
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl font-bold text-yellow-400 max-w-2xl"
          >
            Fatigue Analysis
          </motion.h1>
        </div>
        
         <div
    className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-slate-900 via-blue-700 to-blue-500"
    style={{
      clipPath: "polygon(0 40%, 25% 70%, 55% 45%, 75% 55%, 100% 40%, 100% 100%, 0% 100%)",
    }}
  />

  {/* White section below */}
  <div
    className="absolute bottom-0 left-0 w-full h-28 bg-white "
    style={{
      clipPath: "polygon(0 60%, 25% 80%, 55% 55%, 75% 65%, 100% 50%, 100% 100%, 0% 100%)",
    }}
  />
      </section>

      {/* Overview */}
      <section className="container-px mx-auto py-16 md:py-24 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-lg leading-relaxed text-muted-foreground"
        >
          ATSS offers advanced Finite Element Analysis (FEA) services to evaluate complex
          structural behavior that cannot be accurately captured using conventional methods.
          FEA is applied to critical components such as bolted and welded connections, base
          plates, gussets, brackets, and special structural elements. Through detailed stress,
          strain, deformation, and fatigue analysis, we help optimize designs, validate safety
          margins, and improve structural performance under real-world loading conditions.
        </motion.p>
      </section>

      {/* Highlights */}
      <section className="bg-card border-y border-border py-16 md:py-24">
        <div className="container-px mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl font-semibold mb-12"
          >
            What We Cover
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl border border-border bg-background p-6 hover:border-yellow-500/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-yellow-500/10 text-yellow-500">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px mx-auto py-16 md:py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl font-semibold mb-4"
        >
          Need an FEA Study?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground mb-8 max-w-xl mx-auto"
        >
          Contact our structural engineering team to discuss your FEA requirements and
          get a detailed simulation study tailored to your project.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-yellow-400 transition-colors"
        >
          Contact Us
          <ArrowLeft size={14} className="rotate-180" />
        </motion.a>
      </section>
    </main>
  );
};

export default FeaService;
