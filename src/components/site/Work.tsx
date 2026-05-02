import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import network from "@/assets/network-aerial.jpg";

const cases = [
  {
    tag: "5G Retrofit",
    title: "Carrier-grade upgrade across 380 sites",
    metric: "+42%",
    metricLabel: "Load capacity",
    desc: "Engineered minimum-steel retrofit for nationwide 5G mid-band rollout, completed 6 weeks ahead of schedule.",
  },
  {
    tag: "Coastal Resilience",
    title: "Hurricane-rated monopole network",
    metric: "187 mph",
    metricLabel: "Wind survivability",
    desc: "New foundation design and CFD-validated structural envelope for 64 coastal sites in Category 5 wind zones.",
  },
  {
    tag: "AI Inspection",
    title: "Drone + ML defect detection at scale",
    metric: "94%",
    metricLabel: "Faster than manual",
    desc: "Deployed our AI inspection pipeline across 2,100 towers — flagged 318 critical defects missed by visual review.",
  },
];

const Work = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-background">
      <div className="relative container-px mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-4 overflow-hidden rounded-3xl border border-border"
        >
          <img
            src={network}
            alt="Network infrastructure aerial view"
            loading="lazy"
            width={1600}
            height={1000}
            className="h-[280px] w-full object-cover md:h-[480px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="text-xs uppercase tracking-wider text-accent">
              Featured deployment
            </div>
            <div className="mt-2 max-w-2xl font-display text-2xl font-semibold text-white md:text-4xl">
              National backbone reinforcement — 1,240 sites in 18 months.
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {cases.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1"
            >
              <span className="self-start rounded-full bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-wider text-primary font-medium">
                {c.tag}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                {c.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{c.desc}</p>
              <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
                <div>
                  <div className="font-display text-3xl font-bold text-primary">
                    {c.metric}
                  </div>
                  <div className="text-xs text-muted-foreground">{c.metricLabel}</div>
                </div>
                <TrendingUp className="text-accent opacity-60" size={20} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
