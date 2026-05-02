import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative border-t border-border py-12 bg-card">
      <div className="container-px mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative h-7 w-7">
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-primary to-[hsl(217,80%,40%)]" />
            <div className="absolute inset-[3px] rounded-[5px] bg-white grid place-items-center">
              <span className="font-display text-[10px] font-bold text-primary">A</span>
            </div>
          </div>
          <div className="text-sm">
            <span className="font-display font-semibold text-foreground">ATSS</span>
            <span className="text-muted-foreground"> — Advanced Tower Structural Solutions</span>
          </div>
        </Link>

        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
          <Link to="/work" className="hover:text-primary transition-colors">Our Work</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>

        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ATSS Engineering. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
