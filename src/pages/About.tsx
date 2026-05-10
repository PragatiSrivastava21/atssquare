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

const About = () => {
  useLenis();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />

      {/* Hero with background image */}
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
            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-2xl">
              At ATSS, we are dedicated to advancing the reliability and performance of wireless infrastructure
              through cutting-edge engineering solutions. With a focus on innovation, precision, and client satisfaction,
              we provide comprehensive services designed to meet the unique challenges of the wireless industry.
            </p>
          </motion.div>
        </div>

         <div
    className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-slate-900 via-blue-700 to-blue-500"
    style={{
      clipPath: "polygon(0 40%, 25% 70%, 55% 45%, 75% 55%, 100% 40%, 100% 100%, 0% 100%)",
    }}
  />

  {/* White section below */}
  <div
    className="absolute bottom-0 left-0 w-full h-28 bg-white "
    style={{
      clipPath: "polygon(0 60%, 25% 80%, 55% 55%, 75% 65%, 100% 50%, 100% 100%, 0% 100%)",
    }}
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
                className="rounded-2xl hover:bg-slate-950/5 border border-border bg-card p-7 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow"
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

   
      <WhatWeDoSection />
         <CEOSection />
      <TeamSection />
      <Trust />
      <Footer />
    </main>
  );
};

export default About;