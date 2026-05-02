import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
      <section className="pt-32 pb-20 container-px mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-14"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Blog
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Insights from the <span className="text-gradient-hero">field.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Engineering perspectives, industry updates, and technical deep-dives from our team.
          </p>
        </motion.div>

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
      </section>
      <Footer />
    </main>
  );
};

export default Blog;
