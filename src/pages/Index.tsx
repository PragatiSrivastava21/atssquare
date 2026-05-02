import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import StatsCounter from "@/components/site/StatsCounter";
import ProblemSolution from "@/components/site/ProblemSolution";
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
      <StatsCounter />
      <ProblemSolution />
      <Process />
      <Work />
      <Trust />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
