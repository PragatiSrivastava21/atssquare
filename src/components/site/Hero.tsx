import { motion } from "framer-motion";
import { ArrowRight, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroTower from "@/assets/hero-tower.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-hero">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroTower}
          alt="Telecom tower at twilight"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Glow orbs */}
      <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-highlight/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[100px]" />

      {/* Signal waves */}
      <div className="absolute right-[12%] top-[28%] hidden md:block">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/60"
            style={{ animation: `ping-slow 3s ${i}s cubic-bezier(0,0,0.2,1) infinite` }}
          />
        ))}
        <span className="block h-2 w-2 rounded-full bg-primary shadow-glow-gold" />
      </div>

      <div className="relative z-10 container-px mx-auto flex min-h-[100svh] flex-col justify-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 self-start rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <Radio size={12} className="text-primary" />
          <span>Trusted by carriers across 14 countries</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-5xl font-display text-[44px] font-semibold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px]"
        >
          Engineering the{" "}
          <span className="text-gradient-hero">backbone</span>
          <br className="hidden md:block" /> of modern connectivity.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg"
        >
          Structural analysis, FEA simulation and AI-driven inspection for
          telecom towers. We turn precision engineering into reliable
          infrastructure that stands for decades.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button variant="hero" size="xl" asChild>
            <a href="#services">
              Explore Services <ArrowRight size={16} />
            </a>
          </Button>
          <Button variant="glass" size="xl" asChild>
            <a href="#contact">Talk to an Engineer</a>
          </Button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 gap-6 border-t border-border/40 pt-8 md:grid-cols-4 md:gap-10"
        >
          {[
            { v: "12,400+", l: "Towers analyzed" },
            { v: "99.97%", l: "Structural integrity rate" },
            { v: "14", l: "Countries deployed" },
            { v: "ISO 9001", l: "Certified processes" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-2xl font-semibold md:text-3xl text-gradient-gold">
                {s.v}
              </div>
              <div className="mt-1 text-xs text-muted-foreground md:text-sm">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
