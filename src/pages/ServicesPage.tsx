import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Services from "@/components/site/Services";
import CTA from "@/components/site/CTA";
import { motion } from "framer-motion";
import wireframeTower from "@/assets/serv.png";

const ServicesPage = () => {
  useLenis();
  return (
    <main className="relative h-full overflow-x-hidden bg-background text-foreground">
      <Navbar />

      {/* ── Hero with background image ── */}
       <section  className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div className="absolute inset-0">
          <img
            src={wireframeTower }
            alt="Telecom tower infrastructure at golden hour"
            width={1920}
            height={1080}
            className="h-full w-full object-cover scale-110 opacity-50"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(217,67%,7%)/0.7] via-[hsl(217,67%,12%)/0.6] to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(217,67%,7%)/0.5] via-transparent to-transparent" />

           <div className="relative z-10 w-full pt-5 pb-20 px-6 md:px-16 lg:px-24">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="max-w-3xl text-left"
  >
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Our Services
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold text-[#091a3d] md:text-6xl">
              <span className="whitespace-nowrap">A full-stack engineering{" "}</span><br />
              <span className="relative inline-block">
                <span className="text-yellow-500">practice</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 9 Q 50 2, 100 6 T 198 4" stroke="hsl(44, 65%, 52%)" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>{" "}
              <span className="text-[#091a3d] decoration-[#d4a017] decoration-2">
                for wireless infrastructure.
              </span>
            </h1>
            <p className="mt-6 text-lg text-[#091a3d] leading-relaxed max-w-2xl">
              Six disciplines, one team. From the bolt to the byte - we engineer every layer that keeps networks online.
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

      <Services />
      <CTA />
      <Footer />
    </main>
  );
};

export default ServicesPage;
