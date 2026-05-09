import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { motion } from "framer-motion";
import { Shield, Database, Cookie, Share2, Lock, UserCheck, Mail } from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "1. Information We Collect",
    body: "We collect information you provide directly — such as name, email, company, and project details when you contact us, request a proposal, or subscribe to updates. We also collect limited technical data (IP address, browser type, device, and usage patterns) automatically through our site.",
  },
  {
    icon: Shield,
    title: "2. How We Use Your Data",
    body: "Your information helps us respond to inquiries, deliver engineering services, send relevant updates, improve our website, and comply with legal obligations. We never sell personal data and use it strictly for legitimate business purposes.",
  },
  {
    icon: Cookie,
    title: "3. Cookies & Tracking",
    body: "We use cookies and similar technologies to remember preferences, analyze traffic, and improve performance. You can control cookies through your browser settings. Disabling cookies may limit some site functionality.",
  },
  {
    icon: Share2,
    title: "4. Third-Party Services",
    body: "We may share limited data with trusted service providers (hosting, analytics, email delivery) who are bound by confidentiality. We do not sell or rent your personal information to third parties for marketing purposes.",
  },
  {
    icon: Lock,
    title: "5. Data Security",
    body: "We apply industry-standard administrative, technical, and physical safeguards to protect your information. While no system is completely secure, we continuously review and strengthen our security posture.",
  },
  {
    icon: UserCheck,
    title: "6. Your Rights",
    body: "You have the right to access, correct, update, or request deletion of your personal data. You may also opt out of marketing communications at any time by contacting us or using the unsubscribe link in our emails.",
  },
  {
    icon: Mail,
    title: "7. Contact Us",
    body: "For privacy questions or requests, email engineering@atss.com or write to us at 1200 Tower Drive, Suite 400, Dallas, TX 75201. We aim to respond within one business day.",
  },
];

const Privacy = () => {
  useLenis();
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-16 container-px mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Legal
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Privacy <span className="text-gradient-hero">Policy</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            How ATSS collects, uses, and protects your information. Last updated: January 2026.
          </p>
        </motion.div>
      </section>

      <section className="pb-24 container-px mx-auto">
        <div className="mx-auto max-w-4xl grid gap-6">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold">{s.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Privacy;
