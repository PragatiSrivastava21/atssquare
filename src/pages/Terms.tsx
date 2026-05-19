import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { motion } from "framer-motion";
import { Globe, UserCog, CreditCard, Copyright, AlertTriangle, XCircle, Mail } from "lucide-react";

const sections = [
  {
    icon: Globe,
    title: "1. Website Usage",
    body: "The content on this website is provided for general information purposes only. While we strive to keep the information up to date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or availability of the website or the information, products, services, or related graphics contained on the website.Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.",
  },
  {
    icon: UserCog,
    title: "2.  Intellectual Property",
    body: "All content on the ATSS website, including but not limited to text, graphics, logos, images, and software, is the property of ATSS and is protected by copyright and other intellectual property laws. Unauthorized use or reproduction of any content is strictly prohibited.You may not use any content from our website for commercial purposes without obtaining a license from us or our licensors.",
  },
  {
    icon: CreditCard,
    title: "3. Client Responsibilities",
    body: "Clients are responsible for providing accurate and complete information required for the successful execution of services.To avoid delays or additional costs, clients must ensure timely communication and cooperation during the project lifecycle.Any modifications or changes requested by the client after the commencement of a project may incur additional fees.",
  },
  {
    icon: Copyright,
    title: "4. Payment Terms",
    body: "Payment terms will be clearly outlined in the contract or agreement between ATSS and the client. Payments are typically required in stages, with the final payment due upon project completion.In the event of non-payment or late payment, ATSS reserves the right to suspend or terminate services until the outstanding balance is paid in full.",
  },
  {
    icon: AlertTriangle,
    title: "5. Limitation of Liability",
    body: "ATSS will not be liable for any direct, indirect, incidental, or consequential damages arising out of or in connection with the use of our services or website. This includes, but is not limited to, loss of data, loss of profits, or business interruption.While we make every effort to ensure the accuracy and reliability of our services, we do not guarantee that our solutions will meet all of your specific requirements or that they will be error-free.",
  },
  {
    icon: XCircle,
    title: "6.  Confidentiality",
    body: "ATSS is committed to maintaining the confidentiality of all client information and project details. We will not disclose any information to third parties without the client’s prior consent, except as required by law.",
  },
  {
    icon: Mail,
    title: "7.  Termination",
    body: "ATSS reserves the right to terminate any service agreement if the client breaches any of these Terms and Conditions or the specific terms outlined in the contract. Upon termination, the client is responsible for paying any outstanding balances for services rendered up to the termination date.",
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
          className="max-w-5xl mx-auto text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Legal
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Terms & <span className="text-gradient-hero">Conditions</span>
          </h1>
          <p className="mt-6 text-lg text-slate-800">
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

export default Terms;
