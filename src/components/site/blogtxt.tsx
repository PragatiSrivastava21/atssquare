"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

type ColorKey = "purple" | "teal" | "coral" | "blue";

interface Post {
  title: string;
  excerpt: string;
  full: string;
  date: string;
  tag: string;
  color: ColorKey;
}

const posts: Post[] = [
  {
    title: "The quiet power of constraints in design systems",
    excerpt:
      "How intentional limitations—fewer colors, stricter type scales, tighter spacing—paradoxically unlock more creative output across teams.",
    full: "Design systems with too much freedom become a liability. When every component accepts any color, any size, and any layout, designers spend cognitive budget on decisions that should already be made.\n\nThe teams shipping the most consistent products have the strictest systems: a single spacing scale, two or three brand colors used with discipline, and type sizes that don't negotiate. The constraints aren't restrictions — they're answers to questions that shouldn't need asking every sprint.\n\nThe real insight is that constraints move creative energy upstream. Instead of debating whether a button should be 36px or 40px tall, designers argue about what the button should actually do — which is the only debate worth having.",
    date: "May 3, 2026",
    tag: "Design",
    color: "purple",
  },
  {
    title: "What async-first teams actually get right",
    excerpt:
      "It's not about the tools. The organizations shipping fastest have restructured how decisions are documented, not just where they communicate.",
    full: "Most companies adopt async tools and see no improvement. They swap Slack for Notion, daily standups for status docs, and end up with the same bottlenecks wearing different clothes.\n\nThe teams that actually benefit have done something harder: they changed what counts as a decision. In synchronous cultures, decisions live in people's heads and meeting notes. In true async cultures, decisions live in searchable, linkable documents with explicit rationale.\n\nThat shift has nothing to do with tooling. It's a writing culture, and it takes months to build.",
    date: "Apr 28, 2026",
    tag: "Work",
    color: "teal",
  },
  {
    title: "Rethinking component APIs from the consumer's side",
    excerpt:
      "Most component libraries are designed by authors, for authors. Here's how thinking like a consumer first changes every prop name and default.",
    full: "Author-perspective APIs are easy to spot: prop names that mirror internal implementation, boolean flags for every edge case, no sensible defaults. They're complete but exhausting to use.\n\nConsumer-perspective APIs start with usage. Before writing a single line of component code, write the JSX you wish you could type. What props are obvious? What should work without any props at all?\n\nThe most useful exercise is writing five different usage examples and seeing which one feels most natural. That naturally-feeling version is usually the right API — and it's almost never the one you'd design top-down from the implementation.",
    date: "Apr 19, 2026",
    tag: "Engineering",
    color: "coral",
  },
  {
    title: "On writing changelogs people actually read",
    excerpt:
      "The changelog is the most underrated piece of developer communication. A few structural changes and a shift in voice make all the difference.",
    full: "Most changelogs read like git logs with punctuation added. \"Fixed bug in auth flow.\" \"Updated dependencies.\" These sentences are technically true and completely useless.\n\nA changelog entry has one job: help the reader decide whether to update and prepare for what changes. That means leading with the user impact, not the technical change. \"Login no longer fails on Safari 17\" is more useful than \"Fixed OAuth token refresh race condition.\"\n\nThe other shift is tone. Changelogs are marketing as much as documentation. The teams with thriving developer communities write changelogs that feel like letters — specific, honest, occasionally self-deprecating about what took too long to fix.",
    date: "Apr 10, 2026",
    tag: "Writing",
    color: "blue",
  },
];

const colorMap: Record<
  ColorKey,
  { tag: string; divider: string; accent: string }
> = {
  purple: {
    tag: "bg-[#EEEDFE] text-[#3C3489]",
    divider: "bg-[#AFA9EC]",
    accent: "from-[#EEEDFE]",
  },
  teal: {
    tag: "bg-[#E1F5EE] text-[#0F6E56]",
    divider: "bg-[#5DCAA5]",
    accent: "from-[#E1F5EE]",
  },
  coral: {
    tag: "bg-[#FAECE7] text-[#993C1D]",
    divider: "bg-[#F0997B]",
    accent: "from-[#FAECE7]",
  },
  blue: {
    tag: "bg-[#E6F1FB] text-[#0C447C]",
    divider: "bg-[#85B7EB]",
    accent: "from-[#E6F1FB]",
  },
};

function BlogCard({ post, index }: { post: Post; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const colors = colorMap[post.color];

  
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col rounded-2xl border bg-white p-7 overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-gray-300 shadow-md"
          : "border-gray-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
      }`}
    >
      {/* Accent gradient overlay */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.accent} to-transparent transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      />

      {/* Meta */}
      <div className="relative flex items-center gap-3">
        <span className="text-xs text-gray-400">{post.date}</span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide ${colors.tag}`}
        >
          {post.tag}
        </span>
      </div>

      {/* Divider */}
      <div className={`relative mt-3.5 h-0.5 w-7 rounded-full ${colors.divider}`} />

      {/* Title */}
      <h3 className="relative mt-3.5 font-serif text-[18px] font-semibold leading-snug text-gray-900">
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="relative mt-2.5 text-[13.5px] leading-relaxed text-gray-500">
        {post.excerpt}
      </p>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="relative mt-3.5 border-t border-gray-100 pt-3.5 text-[13.5px] leading-[1.75] text-gray-500">
              {post.full.split("\n\n").map((para, i) => (
                <p key={i} className={i > 0 ? "mt-3" : ""}>
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="relative mt-5 inline-flex cursor-pointer items-center gap-1.5 self-start rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-[13px] font-medium text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-100"
      >
        {isOpen ? "Show less" : "Read more"}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-center"
        >
          <Plus size={14} />
        </motion.span>
      </button>
    </motion.article>
  );
}

export default function BlogPostsGrid() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post, i) => (
          <BlogCard key={post.title} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}