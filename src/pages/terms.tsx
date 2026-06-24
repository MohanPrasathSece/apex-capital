import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/lib/smooth-scroll";
import { Cursor } from "@/components/cursor";

export default function TermsConditions() {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Acceptance of Terms",
      text: 'By accessing, browsing, or using the Lumen Capital platform ("Website" or "Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree, you must immediately cease accessing the platform.',
    },
    {
      title: "2. Eligibility",
      text: "By accessing this Website, you represent and warrant that you are at least 18 years of age, possess the legal capacity to enter into binding agreements, and are not barred from accessing digital asset platforms under your local laws.",
    },
    {
      title: "3. Website Purpose",
      text: "The Service provides educational cryptocurrency portals, mock order book interfaces, risk analysis tools, blockchain simulators, and technical market insights. It is designed to act strictly as a learning resource.",
    },
    {
      title: "4. User Responsibilities",
      text: "You are responsible for securing the devices used to access the Website and safeguarding your secure login session key. You agree to provide accurate, current, and complete details when signing up or sending strategic inquiries.",
    },
    {
      title: "5. Acceptable Use",
      text: "You agree to use this Website only for lawful purposes. You must not attempt to disrupt the operational performance of our backend serverless functions, bypass authentication gates, or access database blobs of other users.",
    },
    {
      title: "6. Prohibited Activities",
      text: "Prohibited actions include: reverse-engineering platform assets, executing automated scraping scripts, uploading malicious code, spamming contact forms, utilizing session tokens that do not belong to you, and providing fraudulent details.",
    },
    {
      title: "7. Intellectual Property",
      text: "All material on this Website, including text, custom design systems, icons, graphics, interactive charts, logos, and server scripts, are the exclusive intellectual property of Lumen Capital and are protected under international copyright laws.",
    },
    {
      title: "8. Accuracy of Information",
      text: 'While we make effort to keep educational content up-to-date, we do not warrant that indicators, simulated candlestick charts, or mock order books represent actual or active market prices. Content is provided on an "as-is" basis.',
    },
    {
      title: "9. No Financial Advice",
      text: "The calculations, simulator ratings, charts, and articles displayed inside the platform are for educational purposes only. They do not constitute financial advice, and should not be treated as a call to buy, hold, or sell digital assets.",
    },
    {
      title: "10. No Investment Advice",
      text: "Lumen Capital does not operate as an investment adviser, broker-dealer, or financial consultant. We do not construct personalized portfolios or manage funds. Always consult a licensed professional before making investment decisions.",
    },
    {
      title: "11. Cryptocurrency Risk Disclosure",
      text: "Cryptocurrency markets are subject to extreme volatility, regulatory shifts, network forks, exchange failures, and permanent asset loss. Staking, trading, and self-custody activities involve high structural risk.",
    },
    {
      title: "12. No Guarantee of Returns",
      text: "We make no representation or guarantee that following the models or risk strategies mentioned in the educational hub will yield profits or protect you from asset drawdowns. Past simulated results are not indicative of future performance.",
    },
    {
      title: "13. Limitation of Liability",
      text: "To the maximum extent permitted by law, Lumen Capital, its affiliates, officers, and developers will not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use or inability to use the platform.",
    },
    {
      title: "14. Indemnification",
      text: "You agree to indemnify, defend, and hold harmless Lumen Capital, its directors, employees, and developers from any claims, losses, or legal liabilities arising from your violation of these Terms or misuse of the Website.",
    },
    {
      title: "15. Third-Party Links",
      text: "Our Website may link to external tools or platforms. We do not endorse or assume liability for the contents, products, or services available on these third-party web addresses.",
    },
    {
      title: "16. Privacy Policy Reference",
      text: "Your access to and use of this Website is also governed by our Privacy Policy, which details how we collect, store, and process your personal identifiers and session files securely.",
    },
    {
      title: "17. Suspension of Access",
      text: "We reserve the right, without notice and at our sole discretion, to suspend or terminate your access to the educational client portal for violating these Terms or engaging in activities that threaten database integrity.",
    },
    {
      title: "18. Governing Law",
      text: "These Terms & Conditions are governed by and construed in accordance with the laws of Cyprus, without regard to conflicts of law principles.",
    },
    {
      title: "19. Dispute Resolution",
      text: "Any dispute, controversy, or claim arising out of these Terms will be settled through good-faith negotiation, failing which the dispute will be submitted to binding arbitration in Cyprus.",
    },
    {
      title: "20. Severability",
      text: "If any provision of these Terms is found by a court of competent jurisdiction to be invalid or unenforceable, that provision will be limited, and the remaining provisions will continue in full force and effect.",
    },
    {
      title: "21. Changes to Terms",
      text: "We reserve the right to modify these Terms & Conditions at any time. Changes become effective immediately upon posting to this URL. Your continued usage of the site represents acceptance of the revised conditions.",
    },
    {
      title: "22. Contact Information",
      text: "For enquiries regarding these Terms, please contact our legal desk at hello@lumen.capital.",
    },
    {
      title: "23. Last Updated Date",
      text: "These Terms & Conditions were last updated on June 24, 2026.",
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
              Terms & Conditions
            </h1>
            <p className="mt-2 text-muted-foreground text-sm">
              Please review these Terms & Conditions thoroughly before using the services of Lumen
              Capital.
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
