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
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-primary to-[hsl(217,80%,40%)] shadow-md" />
            <div className="absolute inset-[3px] rounded-[5px] bg-white grid place-items-center">
              <span className="font-display text-[11px] font-bold text-primary">A</span>
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-sm font-semibold tracking-wide text-foreground">ATSS</span>
            <span className="text-[10px] text-muted-foreground">Tower Engineering</span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`relative text-sm transition-colors hover:text-primary ${
                location.pathname === l.href ? "font-medium text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
              {location.pathname === l.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary"
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
                className={`text-sm hover:text-primary ${
                  location.pathname === l.href ? "font-medium text-primary" : "text-muted-foreground"
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
