import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import aboutHeroBg from "@/assets/about-hero-bg.png";

const posts = [
  {
    date: "Apr 18, 2026",
    tag: "Engineering",
    title: "How FEA Simulation Prevents Catastrophic Tower Failures",
    excerpt: "Finite Element Analysis has transformed the way we assess structural integrity. Here's how simulation-first engineering saves lives and millions in capital.",
  },
  {
    date: "Mar 22, 2026",
    tag: "5G",
    title: "5G Rollout: Why Tower Retrofits Are the Bottleneck",
    excerpt: "Carriers are racing to deploy mid-band 5G, but aging tower stock can't handle the new load profiles. We break down the engineering gap.",
  },
  {
    date: "Feb 10, 2026",
    tag: "AI & Inspection",
    title: "AI-Powered Drone Inspections: From Hype to Production",
    excerpt: "We deployed computer vision across 2,100 towers last year. Here's what we learned about accuracy, cost savings and the human-in-the-loop.",
  },
  {
    date: "Jan 05, 2026",
    tag: "Standards",
    title: "TIA-222-H: What Changed and Why It Matters",
    excerpt: "The latest revision of the TIA-222 standard introduces new wind and ice load requirements. Here's a practical guide for tower engineers.",
  },
];

const Blog = () => {
  useLenis();
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <section  className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div className="absolute inset-0">
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
      <div className="grid gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{post.date}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary font-medium">{post.tag}</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
                Read more <ArrowRight size={14} />
              </div>
            </motion.article>
          ))}
        </div>
      <Footer />
    </main>
  );
};

export default Blog;
 