import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden pb-4 pt-36" style={{ background: "linear-gradient(to bottom, #ffffff 0%, #d0ddf0 8%, #7a9fd4 18%, #2e5fa3 30%, #1a3a6b 45%, #0f2451 70%, #091a3d 100%)" }}>
      <div className="relative container-px mx-auto grid gap-8 md:grid-cols-4" style={{ color: "#ffffff" }}>
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/ats2-logo.png" alt="ATS²" className="h-10 w-auto object-contain" />
          </Link>
          <p className="text-sm max-w-[18rem]" style={{ color: "#cbd8ee" }}>
            Advanced Tower Structural Solutions — At ATSS, we are dedicated to delivering engineering solutions that ensure the safety, stability, and performance of your wireless infrastructure.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-sm" style={{ color: "#cbd8ee" }}>
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link to="/work" className="hover:text-white transition-colors">Our Work</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Resources</h4>
          <ul className="flex flex-col gap-2 text-sm" style={{ color: "#cbd8ee" }}>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Contact</h4>
          <div className="text-sm flex flex-col gap-2" style={{ color: "#cbd8ee" }}>
            <a href="mailto:info@atss.com" className="hover:text-white transition-colors">info@atss.com</a>
            <a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (234) 567-890</a>
            <div className="pt-2 flex gap-4">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" style={{ color: "#cbd8ee" }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" style={{ color: "#cbd8ee" }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}>
          <div className="text-xs" style={{ color: "#cbd8ee" }}>© {new Date().getFullYear()} ATSS Engineering. All rights reserved.</div>
          <div className="text-center">
            <h3 className="text-white">Designed by Pragati Srivastava</h3>
            <h4 className="text-sm mt-1" style={{ color: "#8fa8d0" }}>pragatisri21@gmail.com</h4>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;