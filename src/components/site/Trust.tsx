import { motion } from "framer-motion";

const logos = [
  "VERTEX TELECOM",
  "NORDSTREAM 5G",
  "APEX TOWERS",
  "LATTICE NETWORKS",
  "MERIDIAN WIRELESS",
  "SIGNAL CORP",
  "AURORA COMMS",
  "ATLAS INFRA",
];

const Trust = () => {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-px mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-full glass px-3 py-1 text-xs text-primary">
            Trusted by industry leaders
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            The teams keeping networks alive{" "}
            <span className="text-gradient-gold">build with us.</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          {[
            { v: "12,400+", l: "Tower assessments" },
            { v: "1.2 Bn lb", l: "Steel engineered" },
            { v: "18 yrs", l: "Average team experience" },
            { v: "0", l: "Structural failures on record" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="rounded-2xl border border-border/50 bg-gradient-card p-6 text-center"
            >
              <div className="font-display text-3xl font-semibold text-gradient-gold md:text-4xl">
                {s.v}
              </div>
              <div className="mt-2 text-xs text-muted-foreground md:text-sm">{s.l}</div>
            </motion.div>
          ))}
        </div>

        {/* Marquee */}
        <div className="relative mt-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max animate-marquee gap-16">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="font-display text-sm font-semibold tracking-[0.2em] text-muted-foreground/60 transition-colors hover:text-primary"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;
