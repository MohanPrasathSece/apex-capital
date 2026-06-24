import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/lib/smooth-scroll";
import { Cursor } from "@/components/cursor";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Introduction",
      text: 'Lumen Capital ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy describes how we collect, use, store, and share your personal information when you visit or interact with our platform.',
    },
    {
      title: "2. Definitions",
      text: 'In this policy, "Personal Information" refers to any data relating to an identified or identifiable individual. "Service" refers to the Lumen educational cryptocurrency platforms and web applications. "CRM" refers to our third-party lead and affiliate management system.',
    },
    {
      title: "3. Information We Collect",
      text: "We collect information to provide a better experience on our website. This includes data you provide directly to us (e.g. through signup and contact forms) and automatically collected technical parameters during your browser session.",
    },
    {
      title: "4. Information You Voluntarily Provide",
      text: "We collect personal identifiers voluntarily entered by you in our home and logged-in contact and signup forms, which include your full name, email address, phone number, and any additional message text you choose to write.",
    },
    {
      title: "5. Automatically Collected Information",
      text: "When you browse the platform, we automatically collect basic log metadata, including IP addresses, browser types, language preferences, referring URLs, access dates and times, and page click statistics.",
    },
    {
      title: "6. Purpose of Data Collection",
      text: "Your data is collected to verify user authenticity, record active user sessions, provide secure login credentials, customize educational interfaces, reply to strategic inquiries, and manage affiliate tracking logs.",
    },
    {
      title: "7. Legal Basis for Processing",
      text: "We process your personal information under the following legal bases: (a) Your explicit consent; (b) The performance of our contractual obligation to grant access to the educational platform; and (c) Our legitimate business interest in managing relationships and securing the site.",
    },
    {
      title: "8. How Personal Information Is Used",
      text: "We use your data to: establish your educational account, verify user sessions via secure database files, route client inquiries to the appropriate desk, track affiliate leads, and comply with standard anti-fraud guidelines.",
    },
    {
      title: "9. CRM & Third-Party Service Providers",
      text: "Lumen secure contact and sign-up forms automatically submit data to our CRM Core service (inwo.crmcore.me) to process and follow up on investor leads. This integration is handled via secure proxy backend endpoints to protect your credentials.",
    },
    {
      title: "10. Cookies",
      text: "We use essential cookies to maintain your login session. You can configure your browser to reject cookies, but doing so may limit your ability to access gated educational panels or retain custom settings.",
    },
    {
      title: "11. Tracking Technologies",
      text: "We do not deploy invasive third-party analytics pixels. Basic session states are stored locally on your device (e.g. localStorage) and server-side using Vercel private blobs to track session tokens securely.",
    },
    {
      title: "12. Data Security",
      text: "We use strict technical and organizational measures to secure your data, including HTTPS encryption, serverless backend proxies that hide affiliate secrets, and private access constraints on our blob storage buckets.",
    },
    {
      title: "13. Data Retention",
      text: "We retain your personal data and sessions only as long as is necessary to provide platform access, maintain CRM relationship files, or comply with legal audit obligations. Expired session files are periodically purged.",
    },
    {
      title: "14. International Data Transfers",
      text: "Your information may be stored and processed in countries outside of your residence, including on cloud servers maintained by Vercel in the European Union or the United States. We ensure standard data protection clauses govern these transfers.",
    },
    {
      title: "15. User Rights",
      text: "Depending on your jurisdiction (e.g., GDPR, CCPA), you have rights to access, correct, delete, restrict, or obtain a copy of your personal data. To exercise these rights, submit a request via our contact portal.",
    },
    {
      title: "16. Marketing Communications",
      text: "If you sign up or subscribe, we may send you occasional educational newsletters or updates. You can unsubscribe at any time by clicking the link at the bottom of the emails.",
    },
    {
      title: "17. Children's Privacy",
      text: "Our services are designed strictly for institutional and adult users. We do not knowingly collect personal data from individuals under the age of 18.",
    },
    {
      title: "18. Third-Party Websites",
      text: "Our platform may contain links to external cryptocurrency tools, networks, or references. We do not control and are not responsible for the privacy practices of external web addresses.",
    },
    {
      title: "19. Policy Updates",
      text: "We update this privacy policy from time to time to reflect platform changes. Updates are posted directly to this URL, and your continued usage indicates your acceptance of the updated conditions.",
    },
    {
      title: "20. Contact Information",
      text: "If you have any questions, concerns, or requests regarding this Privacy Policy, please contact our privacy officer at hello@lumen.capital.",
    },
    {
      title: "21. Last Updated Date",
      text: "This privacy policy was last updated on June 24, 2026.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SmoothScroll />
      <Cursor />
      <Nav />

      <main className="relative bg-hero pt-32 pb-24 px-6">
        <div className="absolute inset-0 grid-bg" />

        <div className="relative mx-auto max-w-3xl">
          {/* Back button */}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </button>

          {/* Heading */}
          <div className="mb-12">
            <div className="inline-flex rounded-full glass px-3 py-1 text-xs text-muted-foreground">
              Legal Portal
            </div>
            <h1 className="mt-3 font-display text-4xl md:text-6xl tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-2 text-muted-foreground text-sm">
              Please read this privacy policy carefully to understand how we safeguard your personal
              assets and data.
            </p>
          </div>

          {/* Content Card */}
          <div className="glass-strong rounded-3xl p-8 shadow-card space-y-8 border border-white/10">
            {sections.map((sec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.02 }}
                className="space-y-2 border-b border-white/5 pb-6 last:border-0 last:pb-0"
              >
                <h3 className="font-display text-xl md:text-2xl text-primary">{sec.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {sec.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
