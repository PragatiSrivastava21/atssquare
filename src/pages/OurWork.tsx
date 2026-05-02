import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Work from "@/components/site/Work";
import CTA from "@/components/site/CTA";
import { motion } from "framer-motion";

const OurWork = () => {
  useLenis();
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-10 container-px mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Our Work
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Real towers. <span className="text-gradient-gold">Real outcomes.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            A selection of recent engagements with Tier-1 carriers and tower operators worldwide.
          </p>
        </motion.div>
      </section>
      <Work />
      <CTA />
      <Footer />
    </main>
  );
};

export default OurWork;
