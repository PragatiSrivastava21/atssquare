import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";

const Map = () => {
  return (
    <section className="pb-20 container-px mx-auto">
      <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20"
        >
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Find Us
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Our <span className="text-gradient-hero">Location</span>
              </h2>
              <p className="mt-2 text-muted-foreground max-w-md">
                Visit our headquarters in Dallas, or reach out to schedule a site visit anywhere in the region.
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=1200+Tower+Drive,+Dallas,+TX+75201"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-card border border-border px-5 py-2.5 text-sm font-medium text-foreground shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-0.5 transition-all duration-300 shrink-0"
            >
              Get Directions
              <ArrowUpRight size={16} className="text-primary" />
            </a>
          </div>

          <div className="relative rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden hover:shadow-[var(--shadow-elevated)] transition-shadow duration-500">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.0!2d-96.8!3d32.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQ2JzQwLjgiTiA5NsKwNDgnMDAuMCJX!5e0!3m2!1sen!2sus!4v1"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ATSS Office Location"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
              />
            </div>
            <div className="flex items-center justify-between px-6 py-4 bg-card border-t border-border">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">ATSS Engineering HQ</div>
                  <div className="text-xs text-muted-foreground">1200 Tower Drive, Suite 400, Dallas, TX</div>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=1200+Tower+Drive,+Dallas,+TX+75201"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-4 py-2 text-xs font-medium text-primary hover:bg-primary/15 transition-colors"
              >
                Open in Maps
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
    </section>
  );
};

export default Map;