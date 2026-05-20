import { motion } from "framer-motion";
import { Activity, Layers, Antenna, Wind, Settings, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Activity,
    title: "Tower Structural Analysis",
    desc: "Comprehensive structural integrity assessment ensuring safety and compliance with all applicable standards.",
    accent: "#0a1640",
  },
  {
    icon: Settings,
    title: "Fatigue Analysis",
    desc: "Evaluating long-term structural behavior under cyclic loading to prevent structural failure.",
    accent: "#1a3080",
  },
  {
    icon: Layers,
    title: "Foundation Analysis",
    desc: "Geotechnical-driven foundation review, retrofit and new foundation designs for all tower types.",
    accent: "#0a1640",
  },
  {
    icon: Antenna,
    title: "Mount Analysis",
    desc: "Mount capacity evaluation and reinforcement design for 5G and next-gen equipment.",
    accent: "#1a3080",
  },
  {
    icon: Wind,
    title: "FEA & CFD Simulation",
    desc: "Enhancing tower longevity and performance using advanced FEA and CFD simulation methods.",
    accent: "#0a1640",
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;700&display=swap');

  .wwd-section { font-family: 'Lato', sans-serif; }

  .wwd-badge {
    display: inline-block;
    border-radius: 9999px;
    background: linear-gradient(135deg, #b8962e 0%, #f0d060 50%, #b8962e 100%);
    padding: 4px 16px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #0a1628;
    box-shadow: 0 2px 12px rgba(184,150,46,0.3);
    margin-bottom: 1rem;
  }

  .wwd-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 700;
    color: #0a1628;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .wwd-gold {
    background: linear-gradient(135deg, #b8962e 0%, #f5e07a 45%, #c9a84c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .wwd-subtext {
    margin-top: 1rem;
    color: #5a6a8a;
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    font-size: 0.97rem;
    line-height: 1.7;
  }

  /* ── Card ── */
  .wwd-card {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    padding: 1.75rem;
    background: #ffffff;
    border: 1.5px solid rgba(10, 22, 64, 0.13);
    box-shadow: 0 2px 16px rgba(10,22,64,0.06);
    transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
    cursor: default;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .wwd-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 48px rgba(10,22,64,0.13), 0 2px 8px rgba(184,150,46,0.07);
    border-color: rgba(10,22,64,0.07);
  }

  .wwd-border-top, .wwd-border-right,
  .wwd-border-bottom, .wwd-border-left {
    position: absolute;
    background: linear-gradient(135deg, #0a1640, #1a4090, #c9a84c);
    pointer-events: none;
    z-index: 3;
    border-radius: 2px;
  }
  .wwd-border-top    { top: 0; left: 0; height: 2px; width: 0%; transition: width 0.22s ease 0s; }
  .wwd-border-right  { top: 0; right: 0; width: 2px; height: 0%; transition: height 0.22s ease 0.22s; }
  .wwd-border-bottom { bottom: 0; right: 0; height: 2px; width: 0%; transition: width 0.22s ease 0.44s; }
  .wwd-border-left   { bottom: 0; left: 0; width: 2px; height: 0%; transition: height 0.22s ease 0.66s; }

  .wwd-card:hover .wwd-border-top    { width: 100%; }
  .wwd-card:hover .wwd-border-right  { height: 100%; }
  .wwd-card:hover .wwd-border-bottom { width: 100%; }
  .wwd-card:hover .wwd-border-left   { height: 100%; }

  .wwd-glow {
    position: absolute; inset: 0;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(10,22,64,0.02) 0%, rgba(201,168,76,0.04) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none; z-index: 0;
  }
  .wwd-card:hover .wwd-glow { opacity: 1; }

  .wwd-icon {
    display: grid; place-items: center;
    width: 52px; height: 52px;
    border-radius: 14px;
    background: #ffffff;
    border: 1.5px solid rgba(10,22,64,0.14);
    color: #0a1640;
    box-shadow: 0 2px 10px rgba(10,22,64,0.07);
    transition: background 0.35s ease, color 0.35s ease,
                border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
    position: relative; z-index: 1;
    flex-shrink: 0;
  }
  .wwd-card:hover .wwd-icon {
    background: linear-gradient(135deg, #0a1640, #1a3080);
    color: #f0d060;
    border-color: transparent;
    box-shadow: 0 6px 20px rgba(10,22,64,0.28);
    transform: rotate(-6deg) scale(1.1);
  }

  .wwd-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem; font-weight: 700;
    color: #0a1640;
    margin-top: 1.1rem;
    letter-spacing: -0.01em;
    position: relative; z-index: 1;
  }
  .wwd-title::after {
    content: '';
    display: block;
    margin-top: 6px;
    width: 0px; height: 2px;
    border-radius: 2px;
    background: linear-gradient(90deg, #c9a84c, #f0d060);
    transition: width 0.3s ease 0.88s;
  }
  .wwd-card:hover .wwd-title::after { width: 36px; }

  .wwd-desc {
    margin-top: 0.6rem;
    font-size: 0.875rem;
    color: #5a6a8a;
    line-height: 1.75; font-weight: 400;
    position: relative; z-index: 1;
    transition: color 0.3s ease;
    flex: 1;
  }
  .wwd-card:hover .wwd-desc { color: #2e3e5c; }

  .wwd-dot {
    position: absolute; bottom: 14px; right: 14px;
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(10,22,64,0.1);
    transition: background 0.3s ease 0.88s, transform 0.3s ease 0.88s;
    z-index: 1;
  }
  .wwd-card:hover .wwd-dot { background: #c9a84c; transform: scale(1.6); }

  /* ── CTA Button ── */
  .wwd-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    border-radius: 9999px;
    font-family: 'Lato', sans-serif;
    font-size: 0.92rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #ffffff;
    background: linear-gradient(135deg, #0a1640 0%, #1a3080 100%);
    border: none;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(10,22,64,0.3), 0 1px 4px rgba(10,22,64,0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .wwd-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, #b8962e 0%, #f0d060 50%, #b8962e 100%);
    opacity: 0;
    transition: opacity 0.35s ease;
    border-radius: 9999px;
  }
  .wwd-btn:hover::before { opacity: 1; }
  .wwd-btn:hover {
    color: #0a1628;
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 10px 32px rgba(184,150,46,0.4), 0 2px 8px rgba(10,22,64,0.15);
  }
  .wwd-btn span, .wwd-btn svg {
    position: relative; z-index: 1;
    transition: color 0.35s ease;
  }
  .wwd-btn:hover .wwd-arrow { transform: translateX(4px); }
  .wwd-arrow { transition: transform 0.3s ease; }
  .wwd-btn::after {
    content: '';
    position: absolute; inset: -3px;
    border-radius: 9999px;
    border: 2px solid rgba(184,150,46,0);
    transition: border-color 0.35s ease, inset 0.35s ease;
  }
  .wwd-btn:hover::after {
    border-color: rgba(184,150,46,0.5);
    inset: -5px;
  }

  /* ── Second row ── */
  .wwd-second-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  @media (min-width: 1024px) {
    .wwd-second-row {
      display: flex;
      justify-content: center;
      gap: 1.25rem;
      flex-wrap: wrap;
    }
    .wwd-second-row-card {
      width: calc((100% - 2 * 1.25rem) / 3);
      max-width: calc((100% - 2 * 1.25rem) / 3);
    }
  }
`;

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className="wwd-card"
    >
      <span className="wwd-border-top" />
      <span className="wwd-border-right" />
      <span className="wwd-border-bottom" />
      <span className="wwd-border-left" />
      <div className="wwd-glow" />
      <div className="wwd-dot" />
      <div className="wwd-icon">
        <Icon size={22} />
      </div>
      <h3 className="wwd-title">{service.title}</h3>
      <p className="wwd-desc">{service.desc}</p>
    </motion.div>
  );
};

const WhatWeDoSection = () => {
  const firstRow = services.slice(0, 3);
  const secondRow = services.slice(3);

  return (
    <section className="wwd-section py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
      <style>{styles}</style>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="wwd-badge">Capabilities</span>
        <h2 className="wwd-heading">
          What We <span className="wwd-gold">Do</span>
        </h2>
        <p className="wwd-subtext">
          Engineering solutions that power the networks of tomorrow.
        </p>
      </motion.div>

      {/* Row 1 — 1 col on mobile/tablet, 3 col on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {firstRow.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>

      {/* Row 2 — stacked on mobile/tablet, centered flex on desktop */}
      <div className="wwd-second-row mt-5">
        {secondRow.map((s, i) => (
          <div key={s.title} className="wwd-second-row-card">
            <ServiceCard service={s} index={i + 3} />
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-center mt-12"
      >
        <button className="wwd-btn">
          <span>Explore All Services</span>
          <ArrowRight size={17} className="wwd-arrow" />
        </button>
      </motion.div>
    </section>
  );
};

export default WhatWeDoSection;