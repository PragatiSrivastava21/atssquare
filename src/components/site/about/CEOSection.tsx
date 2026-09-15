import { motion } from "framer-motion";
import niteshPhoto from "@/assets/nitesh-ahuja.jpeg";

const CEOSection = () => {
  return (
    <section className="py-20 md:py-28 container-px mx-auto">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent mb-5">
            Leadership
          </span>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
            Meet Our <span className="text-gradient-hero">VISION LEAD</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground max-w-xl">
            At ATSS, our vision is to redefine telecom infrastructure engineering
            through innovation, precision, and reliability. Under the leadership of
            our Vision Head, the company continues to deliver advanced tower structural
            solutions that help build stronger and smarter connectivity networks.
            Our focus is not only on engineering excellence but also on creating
            long-term value for clients through technology-driven solutions.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-12 bg-accent" />
            <div>
              <p className="font-display text-lg font-semibold text-foreground">
               Nitesh Ahuja, P.E
              </p>
              <p className="text-sm text-muted-foreground">
                - President ATSS
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)] overflow-hidden border-gradient">
            <img
              src={niteshPhoto}
              alt="Nitesh Ahuja, P.E — President, ATSS"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CEOSection;