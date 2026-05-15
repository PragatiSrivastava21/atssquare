import { motion } from "framer-motion";
import { Activity, Layers, Building2, Antenna, Wind, Settings, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: Activity,
    title: "Tower Structural Analysis",
    desc: "Comprehensive structural integrity assessment ensuring safety and compliance with all applicable standards.",
  },
  {
    icon: Settings,
    title: "Fatigue Analysis",
    desc: "Evaluating long-term structural behavior(including its material and shape) under cyclic loading to prevent structural failure.",
  },
  {
    icon: Layers,
    title: "Foundation Analysis",
    desc: "Geotechnical-driven foundation review, retrofit and new foundation designs withuplift assessment for all tower types.",
  },
  {
    icon: Antenna,
    title: "Antenna Mount Analysis",
    desc: "Mount capacity evaluation and reinforcement design for 5G and next-gen equipment.",
  },
  {
    icon: Wind,
    title: "FEA / CFD Simulation",
    desc: "FEA of critical structures to enhance its performance. ENhancing tower longitivity and performance using advanced method like CFD and FEA simulations",
  },
  {
    icon: Building2,
    title: "Telecom Infrastructure Optimization",
    desc: "End-to-end solutions to maximize network capacity while minimizing structural risk.",
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;700&display=swap');

  .wwd-section {
    font-family: 'Lato', sans-serif;
  }

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

  /* ── Service Card ── */
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
  }

  .wwd-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 48px rgba(10,22,64,0.13), 0 2px 8px rgba(184,150,46,0.07);
    border-color: rgba(10,22,64,0.07);
  }

  /* Animated border edges — draw clockwise */
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

  /* Inner glow */
  .wwd-glow {
    position: absolute; inset: 0;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(10,22,64,0.02) 0%, rgba(201,168,76,0.04) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none; z-index: 0;
  }
  .wwd-card:hover .wwd-glow { opacity: 1; }

  /* Icon */
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
  }
  .wwd-card:hover .wwd-icon {
    background: linear-gradient(135deg, #0a1640, #1a3080);
    color: #f0d060;
    border-color: transparent;
    box-shadow: 0 6px 20px rgba(10,22,64,0.28);
    transform: rotate(-6deg) scale(1.1);
  }

  /* Card title */
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

  /* Card desc */
  .wwd-desc {
    margin-top: 0.6rem;
    font-size: 0.875rem;
    color: #5a6a8a;
    line-height: 1.75; font-weight: 400;
    position: relative; z-index: 1;
    transition: color 0.3s ease;
  }
  .wwd-card:hover .wwd-desc { color: #2e3e5c; }

  /* Corner dot */
  .wwd-dot {
    position: absolute; bottom: 14px; right: 14px;
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(10,22,64,0.1);
    transition: background 0.3s ease 0.88s, transform 0.3s ease 0.88s;
    z-index: 1;
  }
  .wwd-card:hover .wwd-dot { background: #c9a84c; transform: scale(1.6); }

  /* ── CTA Button ── */
  .wwd-cta-wrap {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }

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
    text-decoration: none;
  }

  /* Gold shimmer sweep on hover */
  .wwd-btn::before {
    content: '';
    position: absolute;
    inset: 0;
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

  /* Arrow nudge on hover */
  .wwd-btn:hover .wwd-arrow {
    transform: translateX(4px);
    transition: transform 0.3s ease;
  }
  .wwd-arrow { transition: transform 0.3s ease; }

  /* Outer ring pulse on hover */
  .wwd-btn::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 9999px;
    border: 2px solid rgba(184,150,46,0);
    transition: border-color 0.35s ease, inset 0.35s ease;
  }
  .wwd-btn:hover::after {
    border-color: rgba(184,150,46,0.5);
    inset: -5px;
  }
`;

const WhatWeDoSection = () => {
  const navigate = useNavigate();

  return (
    <section className="wwd-section py-20 md:py-28 container-px mx-auto">
      <style>{styles}</style>

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

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
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
              <h3 className="wwd-title">{s.title}</h3>
              <p className="wwd-desc">{s.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="wwd-cta-wrap"
      >
        <button className="wwd-btn" onClick={() => navigate("/services")}>
          <span>Explore All Services</span>
          <ArrowRight size={17} className="wwd-arrow" />
        </button>
      </motion.div>
    </section>
  );
};

export default WhatWeDoSection;
