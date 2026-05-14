import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

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
           <h1 className="text-lg md:text-2xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-blue-950 via-blue-800 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
  Advanced Tower Structural Solutions
</h1>

<p className="mt-1 text-sm md:text-base font-semibold tracking-wide uppercase text-blue-700">
  Engineering Simplified
</p>
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
