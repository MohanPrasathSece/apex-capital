import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function SmartInvesting() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -40]);

  const allocations = [
    { label: "Bitcoin", value: 42, color: "var(--teal)" },
    { label: "Ethereum", value: 28, color: "oklch(0.62 0.18 260)" },
    { label: "DeFi", value: 18, color: "oklch(0.72 0.16 200)" },
    { label: "Stables", value: 12, color: "oklch(0.55 0.05 240)" },
  ];

  return (
    <section id="platform" ref={ref} className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80" />
      <motion.div
        style={{ y: y1 }}
        className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex rounded-full glass px-3 py-1 text-xs text-muted-foreground">
            Smart Investing
          </div>
          <h2 className="mt-4 text-4xl md:text-6xl">
            A portfolio that <span className="text-gradient italic">thinks ahead</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            AI-guided allocations, risk-aware rebalancing, and human-quality research - all working
            in concert.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2">
          {/* Allocation card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group relative glass-strong rounded-3xl p-8 shadow-card"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Allocation Wheel
            </div>
            <h3 className="mt-1 font-display text-2xl">Diversified by design</h3>

            <div className="mt-8 flex items-center gap-8">
              <div className="relative h-48 w-48 shrink-0">
                <svg viewBox="0 0 100 100" className="-rotate-90">
                  {(() => {
                    let acc = 0;
                    return allocations.map((a) => {
                      const r = 40,
                        c = 2 * Math.PI * r;
                      const start = (acc / 100) * c;
                      const len = (a.value / 100) * c;
                      acc += a.value;
                      return (
                        <motion.circle
                          key={a.label}
                          cx={50}
                          cy={50}
                          r={r}
                          fill="none"
                          stroke={a.color}
                          strokeWidth={12}
                          strokeDasharray={`${len} ${c}`}
                          strokeDashoffset={-start}
                          initial={{ pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      );
                    });
                  })()}
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="font-display text-3xl">A+</div>
                    <div className="text-xs text-muted-foreground">Score</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                {allocations.map((a, i) => (
                  <motion.div
                    key={a.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ background: a.color }} />
                      {a.label}
                    </div>
                    <span className="tabular-nums text-muted-foreground">{a.value}%</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="relative glass-strong rounded-3xl p-8 shadow-card"
          >
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              AI Co-pilot
            </div>
            <h3 className="mt-1 font-display text-2xl">Insights, every minute</h3>

            <div className="mt-8 space-y-3">
              {[
                {
                  tag: "Opportunity",
                  text: "ETH momentum strengthening - consider 4% reallocation.",
                  color: "var(--teal)",
                },
                {
                  tag: "Risk",
                  text: "Stables exposure below target. Auto-rebalance ready.",
                  color: "oklch(0.72 0.16 60)",
                },
                {
                  tag: "Earn",
                  text: "SOL staking now yields 7.1% APR - enable in one tap.",
                  color: "oklch(0.62 0.18 260)",
                },
              ].map((s, i) => (
                <motion.div
                  key={s.tag}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="rounded-2xl border border-white/5 bg-white/[0.03] p-4"
                >
                  <div
                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest"
                    style={{ color: s.color }}
                  >
                    <span className="h-1 w-1 rounded-full" style={{ background: s.color }} />
                    {s.tag}
                  </div>
                  <div className="mt-1 text-sm">{s.text}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-primary/10 p-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Risk meter</span>
                <span>Conservative</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "32%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-primary/60"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
