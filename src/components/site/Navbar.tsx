import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  //{ label: "Our Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const TAGLINE = "Engineering Simplified";

function TypingTagline() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!isErasing) {
      if (visibleCount < TAGLINE.length) {
        // Type next character
        timeout = setTimeout(() => setVisibleCount((c) => c + 1), 90);
      } else {
        // Fully typed — pause, then start erasing
        timeout = setTimeout(() => setIsErasing(true), 2200);
      }
    } else {
      if (visibleCount > 0) {
        // Erase one character at a time
        timeout = setTimeout(() => setVisibleCount((c) => c - 1), 45);
      } else {
        // Fully erased — pause, then start typing again
        setIsErasing(false);
        timeout = setTimeout(() => setVisibleCount(1), 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [visibleCount, isErasing]);

  return (
    <p
      className="mt-0.5 flex items-center gap-0"
      style={{
        fontFamily: "'poppins', sans-serif",
        fontStyle: "italic",
        fontWeight: 500,
        fontSize: "1.0rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#3b7ecf",
        minWidth: "max-content",
      }}
    >
      {TAGLINE.split("").map((char, i) => (
        <motion.span
          key={i}
          animate={{
            opacity: i < visibleCount ? 1 : 0,
            y: i < visibleCount ? 0 : 4,
            filter: i < visibleCount ? "blur(0px)" : "blur(2px)",
          }}
          transition={{
            duration: 0.18,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}

      {/* Softly breathing cursor */}
      <motion.span
        animate={{ opacity: [1, 0.15] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{ marginLeft: 2, color: "#3b7ecf", fontStyle: "normal" }}
      >
        |
      </motion.span>
    </p>
  );
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["hsl(0 0% 100% / 0)", "hsl(0 0% 100% / 0.85)"]);
  const blur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(16px)"]);
  const border = useTransform(scrollY, [0, 80], ["hsl(217 20% 88% / 0)", "hsl(217 20% 88% / 0.5)"]);

  return (
    <motion.header
      style={{ background: bg, backdropFilter: blur, borderBottom: "1px solid", borderColor: border }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="container-px mx-auto flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="group flex items-center gap-2.5">
          <img src="/ats2-logo.png" alt="ATS² Logo" className="h-12 md:h-16 object-contain" />
          <div className="hidden md:flex flex-col">
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "1.35rem",
                lineHeight: 1.1,
                background: "linear-gradient(90deg, #0a1f44 0%, #1a4a9e 50%, #3b7ecf 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.01em",
              }}
            >
              Advanced Tower Structural Solutions
            </h1>
            <TypingTagline />
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`relative text-sm transition-colors hover:text-[hsl(44,65%,52%)] ${
                location.pathname === l.href ? "font-medium text-[hsl(44,65%,52%)]" : "text-[#0B1F3A]"
              }`}
            >
              {l.label}
              {location.pathname === l.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[hsl(44,65%,52%)]"
                />
              )}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden glass border-t border-border/50">
          <div className="container-px mx-auto flex flex-col gap-4 py-6">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className={`text-sm transition-colors hover:text-[hsl(44,65%,52%)] ${
                  location.pathname === l.href ? "font-medium text-[hsl(44,65%,52%)]" : "text-[#0B1F3A]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
