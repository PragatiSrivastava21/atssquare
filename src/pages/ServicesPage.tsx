import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Services from "@/components/site/Services";
import CTA from "@/components/site/CTA";
import { motion } from "framer-motion";

const ServicesPage = () => {
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
            Our Services
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            A full-stack engineering practice for{" "}
            <span className="text-gradient-gold">wireless infrastructure.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Six disciplines, one team. From the bolt to the byte — we engineer
            every layer that keeps networks online.
          </p>
        </motion.div>
      </section>
      <Services />
      <CTA />
      <Footer />
    </main>
  );
};

export default ServicesPage;
