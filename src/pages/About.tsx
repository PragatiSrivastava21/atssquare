import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Trust from "@/components/site/Trust";
import { motion } from "framer-motion";
import { Target, Eye, Shield, Users } from "lucide-react";

const values = [
  { icon: Target, title: "Precision", desc: "Every analysis is grounded in rigorous science and international standards." },
  { icon: Eye, title: "Transparency", desc: "Clear reporting, honest timelines, and no hidden costs — ever." },
  { icon: Shield, title: "Safety First", desc: "Zero structural failures on record. Safety is non-negotiable." },
  { icon: Users, title: "Partnership", desc: "We embed with your team, not just deliver reports." },
];

const About = () => {
  useLenis();
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-20 container-px mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            About ATSS
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Engineering infrastructure that{" "}
            <span className="text-gradient-hero">stands the test of time.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Founded in 2008, ATSS (Advanced Tower Structural Solutions) is a global
            tower engineering firm serving Tier-1 carriers, tower operators and
            infrastructure funds across 14 countries. Our team of 85+ licensed
            structural engineers specializes in the full lifecycle of wireless
            infrastructure — from greenfield design to end-of-life decommissioning.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Trust />
      <Footer />
    </main>
  );
};

export default About;
