import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Radio } from "lucide-react";
import t1 from "@/assets/2.png";
import t2 from "@/assets/towerr.png";
import t3 from "@/assets/tower.png";
import t4 from "@/assets/guide.png";
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>

const slides = [
  {
    img: t1,
    alt: "Telecom tower against blue sky",
    headlinePre: "Engineering the",
    headlineAccent: "backbone",
    headlinePost: "of modern connectivity.",
    subtitle:
      "Structural analysis, FEA simulation and AI-driven inspection for telecom towers. We turn precision engineering into reliable infrastructure that stands for decades.",
  },
  {
    img: t2,
    alt: "Lattice tower at golden hour",
    headlinePre: "Monopoles built to",
    imgClass: "object-contain object-center scale-75", 
    headlineAccent: "withstand",
    headlinePost: "every storm.",
    subtitle:
      "Wind, ice and seismic loads modelled to international codes — delivering slender monopole designs that stay vertical for decades.",
  },
  {
    img: t3,
    alt: "Engineers inspecting tower",
    headlinePre: "Lattice towers,",
    headlineAccent: "inspected",
    headlinePost: "down to every bolt.",
    subtitle:
      "Detailed structural audits, fatigue assessments and retrofit plans that extend the service life of legacy lattice assets.",
  },
  {
    img: t4,
    alt: "Tower joint detail",
    headlinePre: "Connection detailing",
    headlineAccent: "engineered",
    headlinePost: "for zero failure.",
    subtitle:
      "Connections, weld and bolt verification — because the smallest detail decides whether a tower stands or falls.",
  },
];

const Hero = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);



  return (
    <section className="relative min-h-screen overflow-hidden bg-white text-foreground " style={{ 
  background: "linear-gradient(to bottom, #091a3d 0%, #0f2451 30%, #1a3a6b 45%, #2e5fa3 70%, #7a9fd4 82%, #d0ddf0 92%, #ffffff 100%)" 
}}>
      {/* Slider background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={slides[i].img}
              alt={slides[i].alt}
              width={1920}
              height={1080}
              className="h-full w-full object-cover opacity-80"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-transparent" />
      </div>

      {/* Glow */}
      <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />

      {/* Content */}
      <div className="container-px relative mx-auto flex min-h-[100svh] items-center pt-24 pb-12">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border/10 bg-white px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <Radio className="h-3.5 w-3.5 text-accent" />
            Trusted by carriers across U.S.A
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.h1
              key={`h-${i}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
            >
              {slides[i].headlinePre}{" "}
              <span className="relative inline-block">
                <span className="text-gradient-gold">{slides[i].headlineAccent}</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 9 Q 50 2, 100 6 T 198 4" stroke="hsl(44, 65%, 52%)" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>{" "}
              {slides[i].headlinePost}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`p-${i}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-black text-semibold"
            >
              {slides[i].subtitle}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
           <Link
  to="/services"
  className="group inline-flex items-center gap-2 text-xl rounded-xl bg-gradient-to-r from-slate-900 via-blue-700 to-blue-500 px-6 py-3.5 text-sm font-semibold font-playfair text-white shadow-[0_0_36px_rgba(15,23,42,0.3)] transition-all hover:shadow-[0_0_80px_rgba(59,130,246,0.35)]"
>
  Explore Services

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>



      {/* Slider indicators */}
          <div className="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
                className={`h-1 rounded-full transition-all duration-500 ${
              i === idx ? "w-10 bg-accent" : "w-4 bg-muted-foreground/40"
            }`}
          />
        ))}
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
  );
};

export default Hero;
