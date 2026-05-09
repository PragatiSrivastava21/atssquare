import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What services does ATSS provide?",
    a: "ATSS delivers full-lifecycle telecom tower engineering — structural analysis, modifications design, foundation design, mount analysis, inspections, and decommissioning support — for carriers, tower operators, and infrastructure funds.",
  },
  {
    q: "Which standards and codes do you follow?",
    a: "We work to TIA-222 (Rev. G/H), ASCE 7, ACI 318, AISC 360, and applicable local codes. International projects are delivered per Eurocodes, IS 875/802, CSA S37, or other regional standards as required.",
  },
  {
    q: "What is your typical project turnaround?",
    a: "Standard structural analyses are delivered in 5–7 business days. Complex modification packages typically take 2–3 weeks. We also offer expedited turnarounds for urgent network rollouts.",
  },
  {
    q: "Do you stamp drawings in all states?",
    a: "Yes. Our team holds Professional Engineer licenses across all 50 U.S. states and selected international jurisdictions. Stamped deliverables are included with every engineering package.",
  },
  {
    q: "How do you handle revisions?",
    a: "Each project includes a defined revision allowance. Additional revisions are scoped transparently — no surprise charges. Most clarifications are resolved within one business day.",
  },
  {
    q: "Can ATSS support large portfolio rollouts?",
    a: "Absolutely. We regularly support multi-thousand-site programs with dedicated project managers, custom workflows, and integration into client tracking systems.",
  },
  {
    q: "How do I request a proposal?",
    a: "Visit our Contact page or email engineering@atss.com with your scope, site count, and timeline. You'll receive a scoped proposal within 3 business days.",
  },
];

const Faqs = () => {
  useLenis();
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-16 container-px mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Help Center
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Frequently asked{" "}
            <span className="text-gradient-hero">questions</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Quick answers about our engineering services, timelines, and process. Can't find what you need? Get in touch.
          </p>
        </motion.div>
      </section>

      <section className="pb-24 container-px mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-4 sm:p-8 shadow-[var(--shadow-card)]"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-b-0 border-border">
                <AccordionTrigger className="text-left font-display text-base md:text-lg font-semibold hover:no-underline hover:text-primary transition-colors">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
};

export default Faqs;
