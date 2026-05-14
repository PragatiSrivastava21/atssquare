import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Search, Wrench, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import services5 from "@/assets/services-5.png";

const highlights = [
  {
    icon: Search,
    title: "Visual & NDT Inspections",
    desc: "Thorough on-site inspections using visual methods and non-destructive testing to detect corrosion at every stage.",
  },
  {
    icon: ShieldCheck,
    title: "Section Loss Evaluation",
    desc: "Quantitative assessment of material loss to determine remaining structural capacity and safety margins.",
  },
  {
    icon: Wrench,
    title: "Repair & Strengthening",
    desc: "Engineered repair solutions including member replacement, reinforcement plates, and protective coating systems.",
  },
  {
    icon: Clock,
    title: "Remaining Life Estimation",
    desc: "Data-driven predictions of asset service life to support maintenance planning and capital expenditure decisions.",
  },
];

const CorrosionService = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={services5}
          alt="Corrosion Analysis"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative flex h-full flex-col justify-end container-px mx-auto pb-12">
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
            Service 11
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl font-bold text-white max-w-2xl"
          >
            Corrosion Analysis & Structural Repairs
          </motion.h1>
        </div>
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
          ATSS provides corrosion assessment and mitigation services to evaluate material
          degradation caused by environmental exposure, aging, and operational conditions.
          Our corrosion analysis includes visual inspections, section loss evaluation,
          coating condition assessment, and remaining life estimation. Based on findings,
          we develop structural modification and strengthening solutions such as member
          replacement, reinforcement, protective coating systems, and corrosion-resistant
          design upgrades to extend asset life and ensure continued structural safety.
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
          Need a Corrosion Assessment?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground mb-8 max-w-xl mx-auto"
        >
          Get in touch with our engineering team to schedule an inspection or discuss your
          structural repair requirements.
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

export default CorrosionService;
