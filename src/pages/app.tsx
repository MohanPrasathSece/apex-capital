import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { SmoothScroll } from "@/lib/smooth-scroll";
import { Nav } from "@/components/nav";
import { AuthModals } from "@/components/auth-modals";
import { Footer } from "@/components/footer";
import { Cursor } from "@/components/cursor";
import { toast } from "sonner";
import {
  BookOpen,
  Cpu,
  TrendingUp,
  LineChart,
  Brain,
  Layers,
  Shield,
  Clock,
  Lock,
  HelpCircle,
  ArrowRight,
  CheckCircle,
  Sliders,
  DollarSign,
  Briefcase,
  AlertTriangle,
  Play,
  RotateCcw,
} from "lucide-react";

export default function AppGate() {
  const { user, openLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      openLogin();
    }
  }, [user, openLogin]);

  if (!user) {
    return (
      <div className="grid min-h-screen place-items-center bg-hero text-foreground px-6">
        <div className="text-center max-w-md">
          <h1 className="font-display text-4xl md:text-5xl">Sign in to continue</h1>
          <p className="mt-2 text-muted-foreground">
            Your premium educational crypto journey awaits.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-full border border-white/10 px-6 py-2.5 text-sm hover:bg-white/5 transition-colors cursor-pointer"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SmoothScroll />
      <Cursor />
      <Nav />
      <AppContent />
      <AuthModals />
    </div>
  );
}

function AppContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: "intro", label: "1. Intro to Crypto", icon: BookOpen },
    { id: "blockchain", label: "2. Blockchain Tech", icon: Cpu },
    { id: "investing", label: "3. Asset Investing", icon: Briefcase },
    { id: "trading", label: "4. Trading Basics", icon: LineChart },
    { id: "ai", label: "5. AI Market Analysis", icon: Brain },
    { id: "diversification", label: "6. Diversification", icon: Layers },
    { id: "risk", label: "7. Risk Management", icon: Sliders },
    { id: "trends", label: "8. Market Trends", icon: TrendingUp },
    { id: "security", label: "9. Security Checklist", icon: Shield },
    { id: "faq", label: "10. Questions & FAQs", icon: HelpCircle },
  ];

  return (
    <main className="relative bg-hero min-h-screen text-foreground">
      {/* Intro Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex rounded-full glass px-4 py-1 text-xs text-primary mb-4"
          >
            Institutional Portal // Hello, {user?.name}
          </motion.div>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight">
            Premium <span className="text-gradient italic">Crypto Intelligence</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-muted-foreground">
            A comprehensive, high-fidelity curriculum guiding serious investors from
            first-principles blockchain mechanisms to institutional market intelligence.
          </p>
        </div>
      </section>

      {/* Mac Browser Layout Container */}
      <section className="relative pb-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-3xl overflow-hidden shadow-card border border-white/10"
        >
          {/* Mac Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/5">
            {/* Red / Yellow / Green Dots */}
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#FF5F56]/80" />
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E]/80" />
              <span className="h-3 w-3 rounded-full bg-[#27C93F]/80" />
            </div>

            {/* Address bar */}
            <div className="hidden sm:block flex-1 max-w-md mx-4">
              <div className="w-full text-center text-xs font-mono text-muted-foreground/70 bg-white/5 border border-white/5 py-1.5 rounded-lg select-all">
                lumen.app/education/{tabs[activeTab].id}
              </div>
            </div>

            {/* Platform Tag */}
            <div className="text-[10px] uppercase tracking-wider text-primary font-semibold">
              Lumen Core Client
            </div>
          </div>

          {/* Browser Grid */}
          <div className="grid md:grid-cols-[260px_1fr] min-h-[640px]">
            {/* Sidebar Navigation */}
            <div className="bg-black/20 border-b md:border-b-0 md:border-r border-white/5 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto scrollbar-none shrink-0">
              <div className="hidden md:block text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 px-3 mb-2">
                Chapters
              </div>
              {tabs.map((tab, idx) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(idx)}
                    className={`flex items-center gap-3 w-auto md:w-full text-left px-3 py-2.5 rounded-xl text-base transition-all relative shrink-0 ${
                      activeTab === idx
                        ? "text-primary bg-primary/15 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    <IconComponent className="h-4 w-4 shrink-0" />
                    <span className="whitespace-nowrap">{tab.label}</span>
                    {activeTab === idx && (
                      <motion.div
                        layoutId="activeSideTab"
                        className="absolute right-0 top-1/4 bottom-1/4 w-1 rounded-l-full bg-primary hidden md:block"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Panel */}
            <div className="p-6 md:p-8 bg-background/30 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 h-full flex flex-col justify-between"
                >
                  {activeTab === 0 && <IntroductionTab />}
                  {activeTab === 1 && <BlockchainTab />}
                  {activeTab === 2 && <InvestingTab />}
                  {activeTab === 3 && <TradingTab />}
                  {activeTab === 4 && <AITab />}
                  {activeTab === 5 && <DiversificationTab />}
                  {activeTab === 6 && <RiskTab />}
                  {activeTab === 7 && <TrendsTab />}
                  {activeTab === 8 && <SecurityTab />}
                  {activeTab === 9 && <FAQTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Enquiry Form Gated Section */}
      <AppEnquirySection />
      <Footer />
    </main>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*                     Tab 1: Introduction                     */
/* ─────────────────────────────────────────────────────────── */
function IntroductionTab() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-mono text-primary uppercase tracking-widest">
          Chapter 1 // Principles
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Introduction to Cryptocurrency</h2>
        <p className="text-muted-foreground text-base md:text-lg mt-2">
          Cryptocurrency represents the convergence of cryptography, game theory, and distributed
          computing to solve the double-spending problem without central authorities.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="glass p-5 rounded-2xl space-y-2 border border-white/5 hover:border-primary/20 transition-all group">
          <div className="text-primary font-display text-xl group-hover:translate-x-1 transition-transform flex items-center gap-2">
            The Evolution of Money <ArrowRight className="h-4 w-4" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Transitioning from commodity-based gold standards to fiat-based government credit, and
            finally to trustless mathematical consensus.
          </p>
        </div>

        <div className="glass p-5 rounded-2xl space-y-2 border border-white/5 hover:border-primary/20 transition-all group">
          <div className="text-primary font-display text-xl group-hover:translate-x-1 transition-transform flex items-center gap-2">
            Centralized vs. Decentralized <ArrowRight className="h-4 w-4" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Eliminating singular failure points (central banks, ledger clearing houses) and
            replacing them with public validation networks.
          </p>
        </div>
      </div>

      {/* Floating illustration */}
      <div className="glass rounded-2xl p-6 border border-white/5 relative overflow-hidden flex items-center justify-between">
        <div className="space-y-2 z-10 max-w-md">
          <h4 className="font-medium text-sm">Key Takeaway</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cryptocurrency is not merely digital currency; it is programmable equity, governance
            consensus, and sovereign ownership in the global digital web.
          </p>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 select-none hidden sm:block pointer-events-none">
          <span className="font-display text-[96px] text-primary italic font-semibold">BTC</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*                     Tab 2: Blockchain                       */
/* ─────────────────────────────────────────────────────────── */
function BlockchainTab() {
  const [nodes, setNodes] = useState([
    { id: 1, state: "idle" },
    { id: 2, state: "idle" },
    { id: 3, state: "idle" },
    { id: 4, state: "idle" },
  ]);
  const [status, setStatus] = useState("Idle. Awaiting transaction broadcast...");

  const simulateConsensus = async () => {
    setStatus("Broadcasting transaction...");
    setNodes((prev) => prev.map((n) => (n.id === 1 ? { ...n, state: "active" } : n)));
    await new Promise((r) => setTimeout(r, 800));

    setStatus("Verifying signatures & double-spend protection...");
    setNodes((prev) => prev.map((n) => (n.id === 2 || n.id === 3 ? { ...n, state: "active" } : n)));
    await new Promise((r) => setTimeout(r, 1200));

    setStatus("Achieving network consensus (mining/validation block)...");
    setNodes((prev) => prev.map((n) => ({ ...n, state: "consensus" })));
    await new Promise((r) => setTimeout(r, 1000));

    setStatus("Success! Block written and distributed globally.");
    await new Promise((r) => setTimeout(r, 2000));
    setNodes((prev) => prev.map((n) => ({ ...n, state: "idle" })));
    setStatus("Idle. Awaiting transaction broadcast...");
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-mono text-primary uppercase tracking-widest">
          Chapter 2 // Cryptographic Infrastructure
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Understanding Blockchain</h2>
        <p className="text-muted-foreground text-base mt-1">
          A blockchain is an append-only cryptographic database distributed across a peer-to-peer
          network. Blocks containing transactions are cryptographically chained to prevent
          alterations.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
        <div className="glass p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-medium mb-3">Consensus Visualizer</h4>
            <div className="flex justify-around items-center h-32 relative bg-black/20 rounded-xl px-2">
              <div className="absolute inset-x-0 h-0.5 bg-white/5 z-0" />
              {nodes.map((node) => (
                <div key={node.id} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center font-mono border transition-all duration-300 ${
                      node.state === "active"
                        ? "border-yellow-400/50 bg-yellow-400/10 text-yellow-400"
                        : node.state === "consensus"
                          ? "border-primary bg-primary/20 text-primary shadow-glow"
                          : "border-white/10 bg-white/5 text-muted-foreground"
                    }`}
                  >
                    Node{node.id}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 capitalize">{node.state}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="text-xs font-mono text-muted-foreground italic">{status}</span>
            <button
              onClick={simulateConsensus}
              disabled={status !== "Idle. Awaiting transaction broadcast..."}
              className="bg-primary text-primary-foreground font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-glow hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 cursor-pointer"
            >
              <Play className="h-3 w-3 fill-current" /> Broadcast
            </button>
          </div>
        </div>

        <div className="space-y-3 flex flex-col justify-center">
          <div className="border border-white/5 bg-white/[0.02] p-4 rounded-xl">
            <div className="text-sm font-semibold text-primary">Consensus Types</div>
            <div className="mt-1 text-sm text-muted-foreground">
              <strong>Proof of Work (PoW):</strong> Nodes expend computing energy to solve
              cryptographic hashes (e.g. Bitcoin).
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              <strong>Proof of Stake (PoS):</strong> Validators stake native assets to earn right to
              append blocks (e.g. Ethereum).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*                     Tab 3: Investing                        */
/* ─────────────────────────────────────────────────────────── */
function InvestingTab() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-mono text-primary uppercase tracking-widest">
          Chapter 3 // Allocations
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Digital Asset Investing</h2>
        <p className="text-muted-foreground text-base mt-1">
          Smart digital asset investing requires shifting from speculative day-trading to
          understanding value capture mechanisms, demand drivers, and protocol economies.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            t: "Store of Value",
            d: "Sovereign digital assets with programmatic scarcity (e.g., Bitcoin) acting as a hedge against inflation and monetary debasement.",
          },
          {
            t: "Smart Contract Platforms",
            d: "De-facto digital computing layers (e.g., Ethereum, Solana) that capture transaction fees to reward network participants.",
          },
          {
            t: "Tokenized Cash Flow",
            d: "DeFi protocols that generate revenue (yields, swap fees) and distribute value to token holders via buybacks or staking.",
          },
        ].map((c, i) => (
          <div
            key={i}
            className="glass p-4 rounded-xl border border-white/5 hover:bg-white/[0.05] transition-colors"
          >
            <div className="font-display text-lg text-primary">{c.t}</div>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-xl p-5 border border-white/5 bg-gradient-to-r from-transparent to-primary/5">
        <div className="text-xs font-semibold text-primary">Protocol Fee Metrics</div>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          Before allocating capital, evaluate the **Price-to-Fees (P/F)** ratio. Real yield
          protocols accrue net fees from platform utility rather than simple inflationary emissions.
          Always choose assets with positive real yields.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*                     Tab 4: Trading                          */
/* ─────────────────────────────────────────────────────────── */
function TradingTab() {
  const [candles, setCandles] = useState<number[]>([
    120, 100, 110, 80, 130, 150, 140, 170, 160, 185,
  ]);
  const [orderBook, setOrderBook] = useState<
    { price: number; amount: number; type: "buy" | "sell" }[]
  >([]);
  const [inputPrice, setInputPrice] = useState("67400");
  const [inputAmount, setInputAmount] = useState("0.1");

  // Simulated Live Price feed
  useEffect(() => {
    // Generate initial order book
    const generateInitialBook = () => {
      const book = [];
      for (let i = 0; i < 4; i++) {
        book.push({
          price: 67450 + i * 15,
          amount: Number((Math.random() * 2).toFixed(3)),
          type: "sell" as const,
        });
        book.push({
          price: 67390 - i * 15,
          amount: Number((Math.random() * 2).toFixed(3)),
          type: "buy" as const,
        });
      }
      setOrderBook(book.sort((a, b) => b.price - a.price));
    };
    generateInitialBook();

    const interval = setInterval(() => {
      // Update charts
      setCandles((prev) => {
        const next = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        const change = (Math.random() - 0.48) * 18;
        next.push(Math.max(40, Math.min(220, last + change)));
        return next;
      });

      // Update book values slightly
      setOrderBook((prev) =>
        prev.map((item) => ({
          ...item,
          amount: Math.max(0.01, Number((item.amount + (Math.random() - 0.5) * 0.1).toFixed(3))),
        })),
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleOrderSubmit = (type: "Buy" | "Sell") => {
    const total = Number(inputPrice) * Number(inputAmount);
    toast.success(`${type} Order Executed!`, {
      description: `Submitted order to ${type.toLowerCase()} ${inputAmount} BTC at $${Number(inputPrice).toLocaleString()} (Total: $${total.toLocaleString()})`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-mono text-primary uppercase tracking-widest">
          Chapter 4 // Markets
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Crypto Trading Basics</h2>
        <p className="text-muted-foreground text-base mt-1">
          Understanding price discovery through liquid order books, margin ratios, and basic limit /
          market orders.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
        {/* Animated Candlestick Chart */}
        <div className="glass p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold">Simulated BTC/USDT Feed</span>
            <span className="text-xs tabular-nums text-primary font-mono">$67,412.45</span>
          </div>

          <div className="h-40 bg-black/30 rounded-xl relative overflow-hidden flex items-end justify-between p-2">
            {candles.map((val, idx) => {
              const prevVal = idx > 0 ? candles[idx - 1] : val;
              const isUp = val >= prevVal;
              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center justify-end h-full px-1"
                >
                  {/* Candle Wick */}
                  <div
                    className={`w-0.5 h-full ${isUp ? "bg-primary" : "bg-[#FF5F56]"}`}
                    style={{
                      height: `${val + 15}px`,
                      position: "absolute",
                      bottom: `${Math.min(val, prevVal) - 10}px`,
                    }}
                  />
                  {/* Candle Body */}
                  <div
                    className={`w-full rounded-sm z-10 ${isUp ? "bg-primary/80" : "bg-[#FF5F56]/80"}`}
                    style={{
                      height: `${Math.max(6, Math.abs(val - prevVal))}px`,
                      marginBottom: `${Math.min(val, prevVal)}px`,
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="text-xs text-muted-foreground/60 text-center mt-2 font-mono">
            1M INTERVAL · DELAYED FEED
          </div>
        </div>

        {/* Live Order Book & Form */}
        <div className="space-y-4">
          <div className="glass p-4 rounded-xl border border-white/5">
            <div className="text-xs font-mono uppercase text-muted-foreground/80 mb-2">
              Order Book
            </div>
            <div className="space-y-1">
              {orderBook.map((ord, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between text-xs font-mono py-0.5 px-2 rounded ${ord.type === "sell" ? "bg-[#FF5F56]/5 text-[#FF5F56]/90" : "bg-primary/5 text-primary"}`}
                >
                  <span>${ord.price.toLocaleString()}</span>
                  <span>{ord.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Simple execution panel */}
          <div className="glass p-4 rounded-xl border border-white/5 space-y-3">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Price"
                value={inputPrice}
                onChange={(e) => setInputPrice(e.target.value)}
                className="w-1/2 bg-white/5 border border-white/10 rounded-lg text-xs p-2 focus:outline-none focus:border-primary/50 text-center"
              />
              <input
                type="number"
                placeholder="Amount"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                className="w-1/2 bg-white/5 border border-white/10 rounded-lg text-xs p-2 focus:outline-none focus:border-primary/50 text-center"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleOrderSubmit("Buy")}
                className="w-1/2 bg-primary text-primary-foreground font-semibold text-xs py-2 rounded-xl hover:scale-105 transition-all cursor-pointer"
              >
                Buy (Limit)
              </button>
              <button
                onClick={() => handleOrderSubmit("Sell")}
                className="w-1/2 border border-[#FF5F56]/20 bg-[#FF5F56]/10 text-[#FF5F56] font-semibold text-xs py-2 rounded-xl hover:scale-105 transition-all cursor-pointer"
              >
                Sell (Limit)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*                     Tab 5: AI Analysis                      */
/* ─────────────────────────────────────────────────────────── */
function AITab() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-mono text-primary uppercase tracking-widest">
          Chapter 5 // Intelligence
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">AI & Market Analysis</h2>
        <p className="text-muted-foreground text-base mt-1">
          Utilizing algorithmic systems and natural language sentiment indexes to identify trading
          setups, anomalies, and structural reversals.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <div className="glass p-5 rounded-2xl border border-white/5">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
              AI Sentiment Feed
            </h4>
            <div className="space-y-3">
              {[
                { label: "Institutional Inflows", score: "Extremely Bullish", val: 92 },
                { label: "Social Media Fear Index", score: "Neutral / Fear", val: 38 },
                { label: "Derivatives Leverage Index", score: "Slight Overheating", val: 74 },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span>{item.label}</span>
                    <span
                      className={
                        item.val > 80
                          ? "text-primary"
                          : item.val < 40
                            ? "text-red-400"
                            : "text-yellow-400"
                      }
                    >
                      {item.score}
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-white/5 bg-white/[0.02] p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-primary font-bold">
              Lumen AI Analysis Summary
            </div>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              "System analysis suggests that macro liquidity remains positive. Short-term
              consolidations around dynamic EMAs have shaken out late leverage. Funding rates are
              resetting towards baseline, presenting logical risk-defined accumulation ranges."
            </p>
          </div>
          <div className="mt-4 text-xs text-muted-foreground italic font-mono">
            UPDATED: JUST NOW · MODEL v4.2
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*                     Tab 6: Diversification                  */
/* ─────────────────────────────────────────────────────────── */
function DiversificationTab() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-mono text-primary uppercase tracking-widest">
          Chapter 6 // Strategy
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Portfolio Diversification</h2>
        <p className="text-muted-foreground text-base mt-1">
          Strategic asset allocation reduces drawdown risk and protects against asset-specific
          failures while capturing multi-sector upside.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass p-5 rounded-2xl border border-white/5 space-y-4">
          <h4 className="text-sm font-medium">Lumen Balanced Blueprint</h4>
          <div className="space-y-3">
            {[
              { label: "Core Layer (BTC / ETH)", val: 60, c: "bg-primary" },
              { label: "Layer 1s & Infrastructure (SOL, DOT)", val: 20, c: "bg-teal-400" },
              { label: "Decentralized Finance (DeFi)", val: 10, c: "bg-indigo-400" },
              { label: "Cash & Stablecoins (USDC)", val: 10, c: "bg-muted" },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-sm font-mono">
                  <span>{item.label}</span>
                  <span>{item.val}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.c}`}
                    style={{ width: `${item.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center border border-white/5 bg-white/[0.02] p-5 rounded-2xl space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-primary font-bold">
            Why Rebalancing Matters
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Market volatility causes asset weightings to drift. Set quarterly rules to take profits
            from outperforming sectors and re-allocate to underperforming layers to maintain your
            baseline risk profiles.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*                     Tab 7: Risk Management                  */
/* ─────────────────────────────────────────────────────────── */
function RiskTab() {
  const [size, setSize] = useState(10);
  const [leverage, setLeverage] = useState(2);

  const liquidationPrice = 67400 * (1 - 1 / leverage);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-mono text-primary uppercase tracking-widest">
          Chapter 7 // Risk Control
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Risk Management</h2>
        <p className="text-muted-foreground text-base mt-1">
          In highly volatile cryptocurrency markets, risk management is the absolute divider between
          long-term success and complete capital liquidation.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="glass p-5 rounded-2xl border border-white/5 space-y-4">
          <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Position Size & Leverage Calculator
          </h4>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Account Risk Allocation</span>
                <span className="text-primary font-mono">{size}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-primary bg-white/10 h-1 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Leverage Multiplier</span>
                <span className="text-primary font-mono">{leverage}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={leverage}
                onChange={(e) => setLeverage(Number(e.target.value))}
                className="w-full accent-primary bg-white/10 h-1 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="border border-[#FF5F56]/10 bg-[#FF5F56]/5 p-5 rounded-2xl flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#FF5F56] font-bold">
              <AlertTriangle className="h-4 w-4" /> Liquidation Danger
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              If BTC falls from $67,400 to below{" "}
              <strong className="text-foreground">
                ${Math.round(liquidationPrice).toLocaleString()}
              </strong>
              , your position will be liquidated.
            </p>
          </div>
          <div className="mt-4 text-xs text-muted-foreground/80 font-mono">
            {leverage > 5 ? "⚠️ HIGH LEVERAGE WARNING" : "✅ Conservatively leveraged."}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*                     Tab 8: Market Trends                    */
/* ─────────────────────────────────────────────────────────── */
function TrendsTab() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-mono text-primary uppercase tracking-widest">
          Chapter 8 // Cycles
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Market Trends</h2>
        <p className="text-muted-foreground text-base mt-1">
          Understanding the 4-year halving cycle of Bitcoin and institutional flows dictates
          mid-to-long term market directions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="glass p-5 rounded-2xl border border-white/5 space-y-2">
          <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
            The Halving Effect
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every 210,000 blocks, the supply emissions of new Bitcoins are cut in half.
            Historically, this supply shock acts as the catalyst for bull market runs starting 6 to
            12 months post-halving.
          </p>
        </div>

        <div className="glass p-5 rounded-2xl border border-white/5 space-y-2">
          <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
            Institutional Inflows
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The approval of spot exchange-traded funds (ETFs) connects traditional capital pipelines
            directly to liquid digital assets, reducing historical volatility and establishing a new
            floor for asset values.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*                     Tab 9: Security                         */
/* ─────────────────────────────────────────────────────────── */
function SecurityTab() {
  const [checks, setChecks] = useState([
    {
      id: 1,
      label:
        "Enabled 2-factor authentication on all exchange & email accounts using App Authenticator (not SMS).",
      checked: false,
    },
    {
      id: 2,
      label:
        "Stored backup seed phrases physically on metal, not on cloud-connected devices or text documents.",
      checked: false,
    },
    {
      id: 3,
      label:
        "Utilize a dedicated hardware wallet (cold storage) for asset holds exceeding monthly expenses.",
      checked: false,
    },
    {
      id: 4,
      label:
        "Verify recipient contract addresses and URL links before executing browser wallet transactions.",
      checked: false,
    },
  ]);

  const toggleCheck = (id: number) => {
    setChecks((prev) => prev.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c)));
  };

  const completed = checks.filter((c) => c.checked).length;

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-mono text-primary uppercase tracking-widest">
          Chapter 9 // Self Custody
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Security Best Practices</h2>
        <p className="text-muted-foreground text-base mt-1">
          Unlike legacy finance, there are no chargebacks or password resets on public blockchains.
          You are entirely responsible for securing your digital assets.
        </p>
      </div>

      <div className="glass p-5 rounded-2xl border border-white/5 space-y-4">
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
          <span className="text-xs font-semibold">Security Audit Progress</span>
          <span className="text-xs text-primary font-mono">
            {completed} / {checks.length} Complete
          </span>
        </div>

        <div className="space-y-3">
          {checks.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className="flex items-start gap-3 w-full text-left cursor-pointer"
            >
              <div
                className={`h-4 w-4 rounded border mt-0.5 shrink-0 flex items-center justify-center transition-colors ${
                  item.checked
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-white/20 bg-white/5"
                }`}
              >
                {item.checked && <span className="text-[10px]">✓</span>}
              </div>
              <span
                className={`text-sm ${item.checked ? "line-through text-muted-foreground" : "text-foreground"}`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*                     Tab 10: FAQ                             */
/* ─────────────────────────────────────────────────────────── */
function FAQTab() {
  const [open, setOpen] = useState(-1);

  const faqs = [
    {
      q: "What is Lumen?",
      a: "Lumen is a curated ecosystem that provides advanced crypto education, research signals, and tools for serious institutional-grade digital asset investors.",
    },
    {
      q: "Can I manage digital assets directly inside the portal?",
      a: "No, Lumen does not operate as an exchange or custodial wallet. We provide research, AI tools, calculators, and educational models, while you retain absolute custody of your funds.",
    },
    {
      q: "How do I secure my account session?",
      a: "All sessions are encrypted server-side and recorded securely on Vercel Blob Storage. Ensure you keep your session token stored safely and logout when not in use.",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-mono text-primary uppercase tracking-widest">
          Chapter 10 // Support
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Frequently Asked Questions</h2>
        <p className="text-muted-foreground text-base mt-1">
          Find answers to common operational, technical, and regulatory questions.
        </p>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <div key={idx} className="glass rounded-xl border border-white/5 overflow-hidden">
            <button
              onClick={() => setOpen(open === idx ? -1 : idx)}
              className="w-full flex justify-between items-center p-4 text-left font-medium text-xs md:text-sm hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span>{faq.q}</span>
              <span className="text-primary font-mono">{open === idx ? "−" : "+"}</span>
            </button>
            <AnimatePresence>
              {open === idx && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden bg-black/20"
                >
                  <p className="p-4 text-sm text-muted-foreground leading-relaxed border-t border-white/5">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/*                     Logged-In Enquiry Form                  */
/* ─────────────────────────────────────────────────────────── */
function AppEnquirySection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Field validation states
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.name = "Name is required";
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Invalid email format";
    }
    if (!phone.trim()) {
      errs.phone = "Phone number is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          phone,
          message,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        toast.success("Enquiry received successfully!");
      } else {
        toast.error("Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 border-t border-white/5 bg-black/10">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="mx-auto max-w-xl px-6">
        <div className="text-center mb-8">
          <div className="inline-flex rounded-full glass px-3 py-1 text-xs text-muted-foreground">
            Contact Advisory
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl">Submit an Enquiry</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Request direct guidance or custom portfolios from our strategist desk.
          </p>
        </div>

        <div className="glass-strong rounded-3xl p-8 shadow-card border border-white/10">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="s"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-primary">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl">Thank you!</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Your enquiry has been received successfully. A Lumen strategist will review your
                  profile and reach out.
                </p>
              </motion.div>
            ) : (
              <motion.form key="f" onSubmit={handleEnquirySubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                      }}
                      className="peer w-full rounded-2xl border border-white/10 bg-white/5 px-4 pt-5 pb-2 text-sm outline-none transition-all focus:border-primary/60"
                      placeholder=" "
                    />
                    <label
                      className={`pointer-events-none absolute left-4 transition-all ${fullName.length > 0 ? "top-1.5 text-[10px] uppercase tracking-wider text-primary" : "top-3.5 text-sm text-muted-foreground"}`}
                    >
                      Full Name
                    </label>
                  </div>
                  {errors.name && (
                    <span className="text-[10px] text-red-400 pl-2">{errors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                      }}
                      className="peer w-full rounded-2xl border border-white/10 bg-white/5 px-4 pt-5 pb-2 text-sm outline-none transition-all focus:border-primary/60"
                      placeholder=" "
                    />
                    <label
                      className={`pointer-events-none absolute left-4 transition-all ${email.length > 0 ? "top-1.5 text-[10px] uppercase tracking-wider text-primary" : "top-3.5 text-sm text-muted-foreground"}`}
                    >
                      Email Address
                    </label>
                  </div>
                  {errors.email && (
                    <span className="text-[10px] text-red-400 pl-2">{errors.email}</span>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                      }}
                      className="peer w-full rounded-2xl border border-white/10 bg-white/5 px-4 pt-5 pb-2 text-sm outline-none transition-all focus:border-primary/60"
                      placeholder=" "
                    />
                    <label
                      className={`pointer-events-none absolute left-4 transition-all ${phone.length > 0 ? "top-1.5 text-[10px] uppercase tracking-wider text-primary" : "top-3.5 text-sm text-muted-foreground"}`}
                    >
                      Phone Number
                    </label>
                  </div>
                  {errors.phone && (
                    <span className="text-[10px] text-red-400 pl-2">{errors.phone}</span>
                  )}
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="peer w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 pt-5 pb-2 text-sm outline-none transition-all focus:border-primary/60"
                    placeholder=" "
                  />
                  <label
                    className={`pointer-events-none absolute left-4 transition-all ${message.length > 0 ? "top-1.5 text-[10px] uppercase tracking-wider text-primary" : "top-3.5 text-sm text-muted-foreground"}`}
                  >
                    Message (optional)
                  </label>
                </div>

                {/* Submit button */}
                <button
                  disabled={loading}
                  className="w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                      Processing...
                    </>
                  ) : (
                    "Submit enquiry"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
