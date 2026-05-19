import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { motion } from "framer-motion";
import { Shield, Database, Cookie, Share2, Lock, UserCheck, Mail } from "lucide-react";

const sections = [
  {
    icon: Database,
    title: "1. Introduction",
    body:
      "ATSS is committed to protecting the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website and use our services. By accessing our website or engaging with our services, you consent to the practices described in this policy.",
  },
  {
    icon: Database,
    title: "2. Information We Collect",
    body:
      "We may collect personal information such as your name, email address, phone number, and company details when you contact us, request a quote, or engage our services. We also collect technical information such as IP address, browser type, operating system, and website usage data. Our website may use cookies to enhance user experience and track visitor behavior.",
  },
  {
    icon: Shield,
    title: "3. How We Use Your Information",
    body:
      "We use your data to deliver engineering services, respond to inquiries, process requests, communicate updates, improve website performance, and comply with legal obligations.",
  },
  {
    icon: Share2,
    title: "4. Information Sharing and Disclosure",
    body:
      "We do not sell or rent personal data. We may share information with service providers, legal authorities when required, or during business transfers such as mergers or acquisitions.",
  },
  {
    icon: Lock,
    title: "5. Data Security",
    body:
      "We implement technical and organizational security measures to protect your data, but no system is completely secure.",
  },
  {
    icon: Database,
    title: "6. Data Retention",
    body:
      "We retain personal data only as long as necessary for business or legal purposes and securely delete or anonymize it afterward.",
  },
  {
    icon: UserCheck,
    title: "7. Your Rights",
    body:
      "You may request access, correction, deletion, or restriction of your personal data and withdraw consent at any time.",
  },
  {
    icon: Share2,
    title: "8. Third-Party Links",
    body:
      "Our website may contain links to external websites. We are not responsible for their privacy practices.",
  },
  {
    icon: Shield,
    title: "9. Changes to This Policy",
    body:
      "We may update this Privacy Policy at any time. Changes will be effective immediately after posting.",
  },
  {
    icon: Mail,
    title: "10. Contact Information",
    body:
      "Phone: +1-574540-9079 | Email: info@atssquare.com | Address: 1527 Waterleaf Lane, Delray Beach, FL-33446",
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
           className="max-w-5xl mx-auto text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Legal
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Privacy <span className="text-gradient-hero">Policy</span>
          </h1>
          <p className="mt-6 text-lg text-slate-800">
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
                    <p className="mt-2 text-sm text-slate-800 leading-relaxed">{s.body}</p>
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
