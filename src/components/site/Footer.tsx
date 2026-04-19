const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 py-12">
      <div className="container-px mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative h-7 w-7">
            <div className="absolute inset-0 rounded-md bg-gradient-gold opacity-90" />
            <div className="absolute inset-[3px] rounded-[5px] bg-background grid place-items-center">
              <span className="font-display text-[10px] font-bold text-gradient-gold">A</span>
            </div>
          </div>
          <div className="text-sm">
            <span className="font-display font-semibold">ATSS</span>
            <span className="text-muted-foreground"> — Advanced Tower Structural Solutions</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <a href="#services" className="hover:text-foreground">Services</a>
          <a href="#process" className="hover:text-foreground">Process</a>
          <a href="#work" className="hover:text-foreground">Work</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </div>

        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ATSS Engineering. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
