import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Portfolio Management",
    desc: "Allocations that adapt to market regime, with one-tap rebalance.",
  },
  {
    title: "AI Analysis",
    desc: "Daily research distilled from on-chain, news, and order-flow signals.",
  },
  {
    title: "Market Alerts",
    desc: "Personalised triggers that only ping when it actually matters.",
  },
  { title: "Cold Wallet Security", desc: "Multi-sig custody with HSM-backed key management." },
  { title: "Staking & Yield", desc: "Curated yield strategies with transparent risk grades." },
  { title: "Research Desk", desc: "Long-form theses and quantitative scorecards on 180+ assets." },
  { title: "Automation", desc: "DCA, take-profit ladders, and conditional orders, codified." },
  {
    title: "Institutional Education",
    desc: "From first satoshi to derivatives strategy, structured.",
  },
  {
    title: "Bank-grade Compliance",
    desc: "SOC 2 Type II, ISO 27001, and segregated client accounts.",
  },
];

export function WhyChoose() {
  return (
    <section id="research" className="relative overflow-hidden py-32">
      <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -right-40 bottom-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex rounded-full glass px-3 py-1 text-xs text-muted-foreground">
            Why Lumen
          </div>
          <h2 className="mt-4 text-4xl md:text-6xl">
            Built for <span className="text-gradient italic">conviction</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every detail engineered for clarity, security, and long-term outperformance.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent p-6"
            >
              <div
                className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at 50% 0%, oklch(0.74 0.13 180 / 0.12), transparent 60%)",
                }}
              />
              <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">
                <span className="font-display text-xl">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="font-display text-xl">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              <div className="mt-6 flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Learn more →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
