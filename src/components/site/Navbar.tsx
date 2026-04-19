import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["hsl(217 67% 7% / 0)", "hsl(217 67% 7% / 0.75)"]);
  const blur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(16px)"]);
  const border = useTransform(scrollY, [0, 80], ["hsl(40 30% 96% / 0)", "hsl(40 30% 96% / 0.08)"]);

  return (
    <motion.header
      style={{ background: bg, backdropFilter: blur, borderBottom: "1px solid", borderColor: border }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className="container-px mx-auto flex h-16 items-center justify-between md:h-20">
        <a href="#" className="group flex items-center gap-2.5">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-md bg-gradient-gold opacity-90 shadow-glow-gold" />
            <div className="absolute inset-[3px] rounded-[5px] bg-background grid place-items-center">
              <span className="font-display text-[11px] font-bold text-gradient-gold">A</span>
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-sm font-semibold tracking-wide">ATSS</span>
            <span className="text-[10px] text-muted-foreground">Tower Engineering</span>
          </div>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button variant="hero" size="sm" asChild>
            <a href="#contact">Get a Quote</a>
          </Button>
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
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <Button variant="hero" size="sm" asChild>
              <a href="#contact">Get a Quote</a>
            </Button>
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
