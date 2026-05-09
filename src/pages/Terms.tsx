import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { motion } from "framer-motion";
import { Globe, UserCog, CreditCard, Copyright, AlertTriangle, XCircle, Mail } from "lucide-react";

const sections = [
  {
    icon: Globe,
    title: "1. Website Usage",
    body: "By accessing or using the ATSS website, you agree to these Terms & Conditions and all applicable laws. You may use the site for lawful, informational, and business purposes only. We may modify, suspend, or discontinue any part of the site without prior notice.",
  },
  {
    icon: UserCog,
    title: "2. User Responsibilities",
    body: "You agree to provide accurate information, maintain the confidentiality of any credentials, and not engage in activities that disrupt the site, infringe on others' rights, or violate applicable laws or regulations.",
  },
  {
    icon: CreditCard,
    title: "3. Payments & Refunds",
    body: "Engineering services are billed per the signed Statement of Work. Invoices are due within agreed terms. Refunds, where applicable, are governed by the project agreement. Late payments may incur interest charges as outlined in the contract.",
  },
  {
    icon: Copyright,
    title: "4. Intellectual Property",
    body: "All content, branding, designs, reports, drawings, and software on this site are owned by ATSS or its licensors and are protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without prior written consent.",
  },
  {
    icon: AlertTriangle,
    title: "5. Limitation of Liability",
    body: "To the fullest extent permitted by law, ATSS is not liable for indirect, incidental, or consequential damages arising from your use of the site. Engineering deliverables are governed by the terms of the relevant project contract.",
  },
  {
    icon: XCircle,
    title: "6. Termination",
    body: "We may suspend or terminate access to the site at our discretion if you violate these terms. Provisions related to intellectual property, liability, and governing law survive termination.",
  },
  {
    icon: Mail,
    title: "7. Contact Information",
    body: "Questions about these terms? Contact us at engineering@atss.com or 1200 Tower Drive, Suite 400, Dallas, TX 75201.",
  },
];

const Terms = () => {
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
            Terms & <span className="text-gradient-hero">Conditions</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            The rules and guidelines for using the ATSS website and services. Last updated: January 2026.
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

export default Terms;
