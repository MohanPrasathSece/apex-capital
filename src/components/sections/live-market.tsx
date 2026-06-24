import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HEAT = Array.from({ length: 36 }, () => (Math.random() - 0.4) * 12);

function FearGreed() {
  const [v, setV] = useState(72);
  useEffect(() => {
    const id = setInterval(() => setV(60 + Math.round(Math.random() * 20)), 2000);
    return () => clearInterval(id);
  }, []);
  const angle = (v / 100) * 180 - 90;
  return (
    <div className="relative">
      <svg viewBox="0 0 200 120" className="w-full">
        <defs>
          <linearGradient id="fg" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.65 0.22 25)" />
            <stop offset="50%" stopColor="oklch(0.78 0.16 80)" />
            <stop offset="100%" stopColor="var(--teal)" />
          </linearGradient>
        </defs>
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#fg)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <motion.line
          x1="100"
          y1="100"
          x2="100"
          y2="35"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transformOrigin: "100px 100px" }}
          animate={{ rotate: angle }}
          transition={{ type: "spring", stiffness: 50, damping: 18 }}
        />
        <circle cx="100" cy="100" r="6" fill="white" />
      </svg>
      <div className="mt-2 text-center">
        <div className="font-display text-3xl">{v}</div>
        <div className="text-xs text-muted-foreground">Greed</div>
      </div>
    </div>
  );
}

export function LiveMarket() {
  return (
    <section id="markets" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[60%] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex rounded-full glass px-3 py-1 text-xs text-muted-foreground">
            Live Markets
          </div>
          <h2 className="mt-4 text-4xl md:text-6xl">
            The market, <span className="text-gradient italic">in motion</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Real-time analytics rendered with cinematic clarity. No noise, just signal.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid gap-6 md:grid-cols-12"
        >
          {/* Big chart */}
          <div className="md:col-span-8 glass-strong rounded-3xl p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">BTC / USD</div>
                <div className="flex items-baseline gap-2">
                  <div className="font-display text-3xl">$67,432.12</div>
                  <div className="text-sm text-primary">+2.4%</div>
                </div>
              </div>
              <div className="flex gap-1 rounded-full border border-white/5 bg-white/5 p-1 text-xs">
                {["1H", "4H", "1D", "1W", "1M"].map((t, i) => (
                  <button
                    key={t}
                    className={`rounded-full px-3 py-1 ${i === 2 ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <svg viewBox="0 0 800 280" className="mt-6 w-full">
              <defs>
                <linearGradient id="ar2" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {Array.from({ length: 60 }, (_, i) => {
                const up = Math.random() > 0.45;
                const h = 10 + Math.random() * 100;
                const y = 80 + Math.random() * 80;
                return (
                  <g key={i}>
                    <rect
                      x={20 + i * 13}
                      y={y}
                      width={7}
                      height={h}
                      fill={up ? "var(--teal)" : "oklch(0.65 0.22 25)"}
                      rx={1.5}
                      opacity={0.7}
                    />
                  </g>
                );
              })}
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                d="M20 180 Q 200 80, 400 140 T 780 90"
                fill="none"
                stroke="var(--teal)"
                strokeWidth={2.5}
              />
              <path d="M20 180 Q 200 80, 400 140 T 780 90 L 780 280 L 20 280 Z" fill="url(#ar2)" />
            </svg>
          </div>

          {/* Fear & greed */}
          <div className="md:col-span-4 glass-strong rounded-3xl p-6 shadow-card">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Fear & Greed
            </div>
            <div className="mt-4">
              <FearGreed />
            </div>
          </div>

          {/* Heatmap */}
          <div className="md:col-span-7 glass-strong rounded-3xl p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Market Heatmap
              </div>
              <div className="text-xs text-muted-foreground">Top 36 by cap</div>
            </div>
            <div className="mt-4 grid grid-cols-9 gap-1">
              {HEAT.map((c, i) => {
                const up = c > 0;
                const intensity = Math.min(Math.abs(c) / 12, 1);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.015 }}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    className="aspect-square rounded-md"
                    style={{
                      background: up
                        ? `oklch(0.74 ${0.06 + intensity * 0.1} 180 / ${0.3 + intensity * 0.7})`
                        : `oklch(0.65 ${0.1 + intensity * 0.12} 25 / ${0.3 + intensity * 0.7})`,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Gainers/losers */}
          <div className="md:col-span-5 glass-strong rounded-3xl p-6 shadow-card">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Top movers
            </div>
            <div className="mt-4 space-y-2">
              {[
                { sym: "SOL", change: 12.4, up: true },
                { sym: "AVAX", change: 8.7, up: true },
                { sym: "ARB", change: -4.2, up: false },
                { sym: "MATIC", change: -2.1, up: false },
              ].map((m, i) => (
                <motion.div
                  key={m.sym}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                      {m.sym}
                    </div>
                    <span className="text-sm">{m.sym}</span>
                  </div>
                  <div className={`text-sm tabular-nums ${m.up ? "text-primary" : "text-red-400"}`}>
                    {m.up ? "+" : ""}
                    {m.change}%
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
