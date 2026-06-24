import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth";

const COINS = [
  { sym: "BTC", name: "Bitcoin", price: 67432.12, change: 2.4 },
  { sym: "ETH", name: "Ethereum", price: 3521.87, change: 1.8 },
  { sym: "SOL", name: "Solana", price: 187.23, change: 5.2 },
  { sym: "AVAX", name: "Avalanche", price: 42.18, change: -1.1 },
  { sym: "LINK", name: "Chainlink", price: 18.94, change: 3.6 },
  { sym: "DOT", name: "Polkadot", price: 8.42, change: 0.9 },
  { sym: "MATIC", name: "Polygon", price: 0.94, change: 4.2 },
  { sym: "ARB", name: "Arbitrum", price: 1.32, change: -0.6 },
];

function useLivePrice(start: number) {
  const [p, setP] = useState(start);
  useEffect(() => {
    const id = setInterval(() => setP((v) => v * (1 + (Math.random() - 0.5) * 0.003)), 1500);
    return () => clearInterval(id);
  }, []);
  return p;
}

function Candle({ x, h, up, y }: { x: number; h: number; up: boolean; y: number }) {
  return (
    <g>
      <line
        x1={x}
        x2={x}
        y1={y - 6}
        y2={y + h + 6}
        stroke={up ? "var(--teal)" : "oklch(0.65 0.22 25)"}
        strokeOpacity={0.5}
      />
      <rect
        x={x - 3}
        y={y}
        width={6}
        height={h}
        fill={up ? "var(--teal)" : "oklch(0.65 0.22 25)"}
        rx={1}
      />
    </g>
  );
}

function Chart() {
  const candles = useRef(
    Array.from({ length: 36 }, (_, i) => {
      const up = Math.random() > 0.45;
      const h = 8 + Math.random() * 70;
      return { x: 20 + i * 14, h, up, y: 60 + Math.random() * 60 };
    }),
  ).current;

  return (
    <svg viewBox="0 0 540 220" className="w-full">
      <defs>
        <linearGradient id="lineG" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--teal)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--teal)" />
          <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="areaG" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {candles.map((c, i) => (
        <Candle key={i} {...c} />
      ))}
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
        d="M20 140 C 80 90, 130 160, 180 120 S 280 60, 340 90 S 460 40, 530 70"
        fill="none"
        stroke="url(#lineG)"
        strokeWidth={2.5}
      />
      <path
        d="M20 140 C 80 90, 130 160, 180 120 S 280 60, 340 90 S 460 40, 530 70 L 530 220 L 20 220 Z"
        fill="url(#areaG)"
      />
    </svg>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const btc = useLivePrice(67432);
  const { openSignup } = useAuth();

  return (
    <section ref={ref} className="relative min-h-[100vh] overflow-hidden bg-hero pt-32 pb-24">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 noise pointer-events-none" />

      {/* floating shapes */}
      <motion.div
        style={{ y }}
        className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse-glow"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute top-40 right-10 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl"
      />

      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]), opacity, scale }}
        className="relative mx-auto max-w-7xl px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto flex w-fit items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Live • $2.4B in assets managed
        </motion.div>

        <h1 className="mx-auto mt-6 max-w-4xl text-center text-5xl leading-[1.05] sm:text-7xl md:text-[88px]">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="block"
          >
            Invest in crypto,
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="block text-gradient italic font-light"
          >
            beautifully.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mx-auto mt-6 max-w-xl text-center text-base text-muted-foreground sm:text-lg"
        >
          Lumen is the refined portfolio platform for serious digital asset investors. Built with
          institutional security, designed for elegance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={openSignup}
            className="group relative overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
          >
            <span className="relative z-10">Start investing →</span>
            <span className="absolute inset-0 -z-0 bg-gradient-to-r from-primary via-primary/80 to-primary [background-size:200%_100%] [background-position:0_0] transition-[background-position] duration-700 group-hover:[background-position:100%_0]" />
          </button>
          <a
            href="#platform"
            className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-foreground/90 backdrop-blur transition-colors hover:bg-white/10"
          >
            Explore platform
          </a>
        </motion.div>

        {/* dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 1200 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/20 to-indigo-500/10 blur-2xl" />
          <div className="relative glass-strong rounded-[1.75rem] p-2 shadow-card">
            <div className="rounded-3xl bg-background/60 p-6">
              {/* window chrome */}
              <div className="mb-4 flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                <div className="ml-4 text-xs text-muted-foreground">lumen.app / portfolio</div>
              </div>
              <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
                <div>
                  <div className="text-xs text-muted-foreground">Total Portfolio</div>
                  <div className="flex items-baseline gap-3">
                    <div className="font-display text-5xl">
                      ${(btc * 3.84).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-sm text-primary">+12.4%</div>
                  </div>
                  <div className="mt-4 rounded-2xl border border-white/5 bg-black/20 p-4">
                    <Chart />
                  </div>
                </div>
                <div className="space-y-3">
                  {COINS.slice(0, 4).map((c, i) => (
                    <motion.div
                      key={c.sym}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + i * 0.1 }}
                      whileHover={{ y: -2, transition: { duration: 0.15 } }}
                      className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                          {c.sym}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{c.name}</div>
                          <div className="text-xs text-muted-foreground">{c.sym}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm tabular-nums">${c.price.toLocaleString()}</div>
                        <div
                          className={`text-xs tabular-nums ${c.change > 0 ? "text-primary" : "text-red-400"}`}
                        >
                          {c.change > 0 ? "+" : ""}
                          {c.change}%
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* floating cards */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-10 top-32 hidden md:block glass rounded-2xl p-4 shadow-card"
          >
            <div className="text-xs text-muted-foreground">AI Recommendation</div>
            <div className="mt-1 text-sm font-medium">Rebalance to ETH</div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-primary">
              +8.2% potential
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-8 bottom-20 hidden md:block glass rounded-2xl p-4 shadow-card"
          >
            <div className="text-xs text-muted-foreground">Risk Score</div>
            <div className="mt-1 font-display text-2xl">A+</div>
            <div className="text-xs text-muted-foreground">Conservative</div>
          </motion.div>
        </motion.div>

        {/* stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            ["$2.4B", "Assets managed"],
            ["280k+", "Active investors"],
            ["180+", "Supported assets"],
            ["99.99%", "Uptime"],
          ].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="font-display text-3xl md:text-4xl text-gradient">{v}</div>
              <div className="mt-1 text-xs text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ticker */}
      <div className="relative mt-20 overflow-hidden border-y border-white/5 bg-black/20 py-4">
        <div className="flex w-max animate-ticker gap-12 whitespace-nowrap">
          {[...COINS, ...COINS, ...COINS].map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="font-bold text-primary">{c.sym}</span>
              <span className="tabular-nums">${c.price.toLocaleString()}</span>
              <span
                className={`tabular-nums text-xs ${c.change > 0 ? "text-primary" : "text-red-400"}`}
              >
                {c.change > 0 ? "▲" : "▼"} {Math.abs(c.change)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
