import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative border-t border-border py-12 bg-card">
      <div className="container-px mx-auto grid gap-8 md:grid-cols-4">
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/ats2-logo.png" alt="ATS²" className="h-10 w-auto object-contain" />
          </Link>
          <p className="text-sm text-muted-foreground max-w-[18rem]">
            Advanced Tower Structural Solutions — structural analysis, FEA simulation and
            inspection services for telecom infrastructure worldwide.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
            </li>
            <li>
              <Link to="/work" className="hover:text-primary transition-colors">Our Work</Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Resources</h4>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li>
              <Link to="/careers" className="hover:text-primary transition-colors">Careers</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Use</Link>
            </li>
            <li>
              <Link to="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-foreground">Contact</h4>
          <div className="text-sm text-muted-foreground flex flex-col gap-2">
            <a href="mailto:info@atss.com" className="hover:text-primary transition-colors">info@atss.com</a>
            <a href="tel:+1234567890" className="hover:text-primary transition-colors">+1 (234) 567-890</a>
            <div className="pt-2">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="mr-4 hover:text-primary transition-colors">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Twitter</a>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} ATSS Engineering. All rights reserved.</div>
          <div className="flex gap-4 text-xs">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
