import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Trust from "@/components/site/Trust";
import CEOSection from "@/components/site/about/CEOSection";
import TeamSection from "@/components/site/about/TeamSection";
import WhatWeDoSection from "@/components/site/about/WhatWeDoSection";
import VisionMission from "@/components/site/about/VisionMission";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Eye, Shield, Users } from "lucide-react";
import { useRef } from "react";
import aboutHeroBg from "@/assets/about-hero-bg.png";

const values = [
  { icon: Target, title: "Precision", desc: "Every analysis is grounded in rigorous science and international standards." },
  { icon: Eye, title: "Transparency", desc: "Clear reporting, honest timelines, and no hidden costs — ever." },
  { icon: Shield, title: "Safety First", desc: "Zero structural failures on record. Safety is non-negotiable." },
  { icon: Users, title: "Partnership", desc: "We embed with your team, not just deliver reports." },
];

const valuesGridStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;700&display=swap');

  .vg-card {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    padding: 1.75rem;
    background: #ffffff;
    border: 1.5px solid rgba(10, 22, 64, 0.15);
    box-shadow: 0 2px 16px rgba(10,22,64,0.06);
    transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
    cursor: default;
    font-family: 'Lato', sans-serif;
  }

  .vg-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 48px rgba(10,22,64,0.12), 0 2px 8px rgba(184,150,46,0.07);
    border-color: rgba(10,22,64,0.06);
  }

  /* ── Animated border edges (draw clockwise on hover) ── */
  .vg-border-top,
  .vg-border-right,
  .vg-border-bottom,
  .vg-border-left {
    position: absolute;
    background: linear-gradient(135deg, #0a1640, #1a4090, #c9a84c);
    pointer-events: none;
    z-index: 3;
    border-radius: 2px;
  }

  /* Top: grows left → right */
  .vg-border-top {
    top: 0; left: 0;
    height: 2px; width: 0%;
    transition: width 0.22s ease 0s;
  }
  /* Right: grows top → bottom */
  .vg-border-right {
    top: 0; right: 0;
    width: 2px; height: 0%;
    transition: height 0.22s ease 0.22s;
  }
  /* Bottom: grows right → left */
  .vg-border-bottom {
    bottom: 0; right: 0;
    height: 2px; width: 0%;
    transition: width 0.22s ease 0.44s;
  }
  /* Left: grows bottom → top */
  .vg-border-left {
    bottom: 0; left: 0;
    width: 2px; height: 0%;
    transition: height 0.22s ease 0.66s;
  }

  .vg-card:hover .vg-border-top    { width: 100%; }
  .vg-card:hover .vg-border-right  { height: 100%; }
  .vg-card:hover .vg-border-bottom { width: 100%; }
  .vg-card:hover .vg-border-left   { height: 100%; }

  /* ── Subtle inner glow ── */
  .vg-inner-glow {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(10,22,64,0.02) 0%, rgba(201,168,76,0.04) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 0;
  }
  .vg-card:hover .vg-inner-glow { opacity: 1; }

  /* ── Icon ── */
  .vg-icon {
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
  .vg-card:hover .vg-icon {
    background: linear-gradient(135deg, #0a1640, #1a3080);
    color: #f0d060;
    border-color: transparent;
    box-shadow: 0 6px 20px rgba(10,22,64,0.28);
    transform: rotate(-6deg) scale(1.1);
  }

  /* ── Title ── */
  .vg-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem; font-weight: 700;
    color: #0a1640;
    margin-top: 1.1rem;
    letter-spacing: -0.01em;
    position: relative; z-index: 1;
  }

  /* Gold accent bar slides in after border draw finishes */
  .vg-title::after {
    content: '';
    display: block;
    margin-top: 6px;
    width: 0px;
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(90deg, #c9a84c, #f0d060);
    transition: width 0.3s ease 0.88s;
  }
  .vg-card:hover .vg-title::after { width: 40px; }

  /* ── Description ── */
  .vg-desc {
    margin-top: 0.75rem;
    font-size: 0.875rem;
    color: #5a6a8a;
    line-height: 1.75; font-weight: 400;
    position: relative; z-index: 1;
    transition: color 0.3s ease;
  }
  .vg-card:hover .vg-desc { color: #2e3e5c; }

  /* ── Corner gold dot ── */
  .vg-dot {
    position: absolute;
    bottom: 16px; right: 16px;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: rgba(10,22,64,0.1);
    transition: background 0.35s ease 0.88s, transform 0.35s ease 0.88s;
    z-index: 1;
  }
  .vg-card:hover .vg-dot {
    background: #c9a84c;
    transform: scale(1.6);
  }
`;

const About = () => {
  useLenis();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <style>{valuesGridStyles}</style>
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img
            src={aboutHeroBg}
            alt="Telecom tower infrastructure at golden hour"
            width={1920}
            height={1080}
            className="h-full w-full object-cover scale-110 opacity-80"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(217,67%,7%)/0.7] via-[hsl(217,67%,12%)/0.6] to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(217,67%,7%)/0.5] via-transparent to-transparent" />

        <div className="container-px relative z-10 mx-auto pt-5 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              About ATSS
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold text-[#091a3d] md:text-6xl">
              <span className="whitespace-nowrap">Engineering infrastructure that{" "}</span><br />
              <span className="relative inline-block">
                <span className="text-yellow-500">Stands</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 9 Q 50 2, 100 6 T 198 4" stroke="hsl(44, 65%, 52%)" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>{" "}
              <span className="text-[#091a3d] decoration-[#d4a017] decoration-2">
                the test of time.
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-2xl">
              At ATSS, we are dedicated to advancing the reliability and performance of wireless infrastructure
              through cutting-edge engineering solutions. With a focus on innovation, precision, and client satisfaction,
              we provide comprehensive services designed to meet the unique challenges of the wireless industry.
            </p>
          </motion.div>
        </div>

        <div
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-slate-900 via-blue-700 to-blue-500"
          style={{ clipPath: "polygon(0 40%, 25% 70%, 55% 45%, 75% 55%, 100% 40%, 100% 100%, 0% 100%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-28 bg-white"
          style={{ clipPath: "polygon(0 60%, 25% 80%, 55% 55%, 75% 65%, 100% 50%, 100% 100%, 0% 100%)" }}
        />
      </section>

      {/* Vision & Mission */}
      <VisionMission />

      {/* Values */}
      <section className="pb-20 container-px mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="vg-card"
              >
                {/* Border draw edges — fire clockwise on hover */}
                <span className="vg-border-top" />
                <span className="vg-border-right" />
                <span className="vg-border-bottom" />
                <span className="vg-border-left" />

                {/* Inner glow */}
                <div className="vg-inner-glow" />

                {/* Corner dot */}
                <div className="vg-dot" />

                {/* Icon */}
                <div className="vg-icon">
                  <Icon size={22} />
                </div>

                <h3 className="vg-title">{v.title}</h3>
                <p className="vg-desc">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <WhatWeDoSection />
      <CEOSection />
      <TeamSection />
      <Trust />
      <Footer />
    </main>
  );
};

export default About;
