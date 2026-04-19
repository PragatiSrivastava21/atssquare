import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import ProblemSolution from "@/components/site/ProblemSolution";
import Services from "@/components/site/Services";
import Process from "@/components/site/Process";
import Work from "@/components/site/Work";
import Trust from "@/components/site/Trust";
import CTA from "@/components/site/CTA";
import Footer from "@/components/site/Footer";

const Index = () => {
  useLenis();

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Services />
      <Process />
      <Work />
      <Trust />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
