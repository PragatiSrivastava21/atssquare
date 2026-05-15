import { motion } from "framer-motion";

const logos = [
  "TOWER OWNERS",
  "TOWER MANUFACTURERS",
 "MOUNT MANUFACTURERS"
];

const Trust = () => {
  return (
    <section className="relative py-24 md:py-32 bg-background">
      <div className="container-px mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Trusted by industry leaders
          </span>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl text-foreground">
            The teams keeping networks alive{" "}
            <span className="text-gradient-gold">build with us.</span>
          </h2>
        </motion.div>

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
