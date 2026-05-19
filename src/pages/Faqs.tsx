import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [

  {
    q: "What services does ATSS provide?",
    a: "ATSS provides end-to-end engineering solutions for wireless infrastructure, including tower structural analysis, structural design and modifications, antenna mount analysis, foundation analysis, finite element analysis (FEA), thermal analysis, corrosion assessment, and 3D structural modelling."
  },
  {
    q: "What industries does ATSS serve?",
    a: "ATSS primarily serves the wireless communication industry, focusing on the design, analysis, and optimization of infrastructure such as towers, poles, and related structures. We ensure that these critical components meet and exceed industry standards for safety and performance."
  },
  {
    q: "How does ATSS ensure the safety and stability of wireless infrastructure?",
    a: "We utilize advanced software and technologies like Robot Structural Analysis, RISA-3D, TNX Tower, and Mathcad to conduct comprehensive structural analysis and design. These tools allow us to accurately assess the stability and integrity of your infrastructure, ensuring it is built to last and withstand environmental stressors."
  },
  {
    q: "What sets ATSS apart from other engineering firms?",
    a: "ATSS is distinguished by our commitment to innovation, precision, and customer satisfaction. We not only provide cutting-edge engineering solutions but also prioritize clear communication, transparency, and on-time delivery. Our deep industry expertise and use of state-of-the-art tools ensure that our clients receive the best possible results."
  },
  {
    q: "How does ATSS approach custom engineering projects?",
    a: "We understand that every project is unique, which is why we offer custom engineering solutions tailored to your specific needs. Our team works closely with you from the initial consultation to the final delivery, ensuring that the solutions we provide are effective, efficient, and within budget."
  },
  {
    q: "How does ATSS stay ahead of industry trends?",
    a: "Our commitment to continuous improvement drives us to stay updated with the latest advancements in engineering technology. We regularly adopt new tools and methodologies that enhance our services, ensuring that our clients benefit from the most current and effective solutions available."
  },
  {
    q: "What is ATSS's approach to customer communication?",
    a: "We prioritize clear and transparent communication throughout the project lifecycle. Our team ensures that you are informed and confident at every stage, making it easy to track progress and address any concerns promptly."
  },
  {
    q: "How can I get in touch with ATSS for a consultation?",
    a: "We welcome the opportunity to discuss how we can support your wireless infrastructure needs. You can contact us via [Insert Phone Number], [Insert Email Address], or visit our office at [Insert Physical Address]. We look forward to working with you."
  },
  {
    q: "What values drive ATSS as a company?",
    a: "ATSS is driven by values of Integrity, Excellence, Innovation, Customer Focus, Sustainability, and Collaboration. These principles guide every aspect of our work, ensuring that we deliver high-quality, reliable engineering solutions while fostering a positive and collaborative work environment."
  },
  {
    q: "Does ATSS offer career opportunities?",
    a: "Yes, ATSS is always looking to expand our team with talented and motivated individuals. We offer diverse career growth opportunities and a collaborative, supportive work culture. If you’re interested in joining us, please visit our Careers page or contact us directly for more information."
  }

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
         className="max-w-5xl mx-auto text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Help Center
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Frequently asked{" "}
            <span className="text-gradient-hero">questions</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600">
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
          className="mx-auto max-w-5xl rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-[var(--shadow-card)]"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-b-0 border-border">
                <AccordionTrigger className="text-left font-display text-base md:text-lg font-semibold hover:no-underline hover:text-primary transition-colors">
                  {f.q}
                </AccordionTrigger>
               <AccordionContent className="text-sm md:text-base text-slate-800 leading-relaxed tracking-wide">
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
