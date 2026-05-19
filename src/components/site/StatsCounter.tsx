import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const useCounter = (end: number, duration: number, inView: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, inView]);
  return count;
};

const stats = [
  { value: 12200, suffix: "+", label: "Towers Analyzed" },
  { value: 99.99, suffix: "%", label: "Targeted Accuracy", decimals: 2 },
  { value: 20, suffix: "+ states", label: "Service Provided" },
  { value: 25, suffix: " yrs+", label: "Years of Experience" },
];

const StatsCounter = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative  bg-background pt-40 pb-20"  >
      <div className="container-px mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            By the numbers
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl text-foreground">
            Trusted engineering at <span className="text-gradient-gold">scale.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          {stats.map((s, idx) => (
            <CounterCard key={s.label} stat={s} index={idx} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CounterCard = ({ stat, index, inView }: { stat: typeof stats[0]; index: number; inView: boolean }) => {
  const count = useCounter(stat.decimals ? stat.value * 100 : stat.value, 2000, inView);
  const displayValue = stat.decimals
    ? (count / 100).toFixed(stat.decimals)
    : count.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-slate-900 hover:bg-slate-950/5 hover:shadow-[0_35px_60px_rgba(15,23,42,0.25)]"
    >
      <div className="font-display text-3xl font-bold text-primary md:text-4xl">
        {displayValue}{stat.suffix}
      </div>
      <div className="mt-2 text-xs text-muted-foreground md:text-sm">{stat.label}</div>
    </motion.div>
  );
};

export default StatsCounter;
