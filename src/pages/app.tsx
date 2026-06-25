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
          <h1 className="font-display text-4xl md:text-5xl">Veuillez vous connecter</h1>
          <p className="mt-2 text-muted-foreground">
            Votre parcours d'apprentissage crypto premium vous attend.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-full border border-white/10 px-6 py-2.5 text-sm hover:bg-white/5 transition-colors cursor-pointer"
          >
            Retour à l'accueil
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
    { id: "intro", label: "1. Intro à la Crypto", icon: BookOpen },
    { id: "blockchain", label: "2. Tech Blockchain", icon: Cpu },
    { id: "investing", label: "3. Investissement", icon: Briefcase },
    { id: "trading", label: "4. Bases du Trading", icon: LineChart },
    { id: "ai", label: "5. Analyse Marché IA", icon: Brain },
    { id: "diversification", label: "6. Diversification", icon: Layers },
    { id: "risk", label: "7. Gestion des Risques", icon: Sliders },
    { id: "trends", label: "8. Tendances Marché", icon: TrendingUp },
    { id: "security", label: "9. Sécurité Checklist", icon: Shield },
    { id: "faq", label: "10. Support & FAQs", icon: HelpCircle },
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
            Portail Institutionnel // Bonjour, {user?.name}
          </motion.div>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight">
            Intelligence <span className="text-gradient italic">Crypto Premium</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-muted-foreground">
            Un programme complet et de haute fidélité guidant les investisseurs sérieux des mécanismes fondamentaux de la blockchain à l'intelligence de marché institutionnelle.
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
                elitechain.app/education/{tabs[activeTab].id}
              </div>
            </div>

            {/* Platform Tag */}
            <div className="text-[10px] uppercase tracking-wider text-primary font-semibold">
              Client Elite Chain Principal
            </div>
          </div>

          {/* Browser Grid */}
          <div className="grid md:grid-cols-[260px_1fr] min-h-[640px]">
            {/* Sidebar Navigation */}
            <div className="bg-black/20 border-b md:border-b-0 md:border-r border-white/5 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto scrollbar-none shrink-0">
              <div className="hidden md:block text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 px-3 mb-2">
                Chapitres
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
          Chapitre 1 // Principes
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Introduction à la Crypto-monnaie</h2>
        <p className="text-muted-foreground text-base md:text-lg mt-2">
          La crypto-monnaie représente la convergence de la cryptographie, de la théorie des jeux et de l'informatique distribuée pour résoudre le problème de la double dépense sans autorité centrale.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="glass p-5 rounded-2xl space-y-2 border border-white/5 hover:border-primary/20 transition-all group">
          <div className="text-primary font-display text-xl group-hover:translate-x-1 transition-transform flex items-center gap-2">
            L'évolution de la monnaie <ArrowRight className="h-4 w-4" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Passage d'étalons-or basés sur des matières premières au crédit gouvernemental basé sur la monnaie fiduciaire, et enfin à un consensus mathématique sans confiance.
          </p>
        </div>

        <div className="glass p-5 rounded-2xl space-y-2 border border-white/5 hover:border-primary/20 transition-all group">
          <div className="text-primary font-display text-xl group-hover:translate-x-1 transition-transform flex items-center gap-2">
            Centralisé vs Décentralisé <ArrowRight className="h-4 w-4" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Élimination des points de défaillance uniques (banques centrales, chambres de compensation) au profit de réseaux de validation publics.
          </p>
        </div>
      </div>

      {/* Floating illustration */}
      <div className="glass rounded-2xl p-6 border border-white/5 relative overflow-hidden flex items-center justify-between">
        <div className="space-y-2 z-10 max-w-md">
          <h4 className="font-medium text-sm">Règle clé</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            La crypto-monnaie n'est pas une simple monnaie numérique ; c'est un capital programmable, un consensus de gouvernance et une propriété souveraine dans le réseau numérique mondial.
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
  const [status, setStatus] = useState("Inactif. En attente de la diffusion de la transaction...");

  const simulateConsensus = async () => {
    setStatus("Diffusion de la transaction...");
    setNodes((prev) => prev.map((n) => (n.id === 1 ? { ...n, state: "active" } : n)));
    await new Promise((r) => setTimeout(r, 800));

    setStatus("Vérification des signatures et protection contre la double dépense...");
    setNodes((prev) => prev.map((n) => (n.id === 2 || n.id === 3 ? { ...n, state: "active" } : n)));
    await new Promise((r) => setTimeout(r, 1200));

    setStatus("Obtention du consensus réseau (bloc de minage/validation)...");
    setNodes((prev) => prev.map((n) => ({ ...n, state: "consensus" })));
    await new Promise((r) => setTimeout(r, 1000));

    setStatus("Succès ! Bloc écrit et distribué mondialement.");
    await new Promise((r) => setTimeout(r, 2000));
    setNodes((prev) => prev.map((n) => ({ ...n, state: "idle" })));
    setStatus("Inactif. En attente de la diffusion de la transaction...");
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-mono text-primary uppercase tracking-widest">
          Chapitre 2 // Infrastructure Cryptographique
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Comprendre la Blockchain</h2>
        <p className="text-muted-foreground text-base mt-1">
          Une blockchain est une base de données cryptographique en ajout uniquement, distribuée sur un réseau pair à pair. Les blocs contenant les transactions sont liés de manière cryptographique pour empêcher toute modification.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
        <div className="glass p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-medium mb-3">Visualiseur de Consensus</h4>
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
                    Nœud{node.id}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 capitalize">
                    {node.state === "idle" ? "inactif" : node.state === "active" ? "actif" : "consensus"}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="text-xs font-mono text-muted-foreground italic">{status}</span>
            <button
              onClick={simulateConsensus}
              disabled={status !== "Inactif. En attente de la diffusion de la transaction..."}
              className="bg-primary text-primary-foreground font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-glow hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 cursor-pointer"
            >
              <Play className="h-3 w-3 fill-current" /> Diffuser
            </button>
          </div>
        </div>

        <div className="space-y-3 flex flex-col justify-center">
          <div className="border border-white/5 bg-white/[0.02] p-4 rounded-xl">
            <div className="text-sm font-semibold text-primary">Types de Consensus</div>
            <div className="mt-1 text-sm text-muted-foreground">
              <strong>Proof of Work (PoW):</strong> Les nœuds dépensent de l'énergie informatique pour résoudre des hachages cryptographiques (ex. Bitcoin).
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              <strong>Proof of Stake (PoS):</strong> Les validateurs jalonnent (stakent) des actifs natifs pour obtenir le droit d'ajouter des blocs (ex. Ethereum).
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
          Chapitre 3 // Allocations
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Investissement en Actifs Numériques</h2>
        <p className="text-muted-foreground text-base mt-1">
          L'investissement intelligent dans les actifs numériques exige de passer du day-trading spéculatif à la compréhension des mécanismes de capture de valeur, des moteurs de demande et de l'économie des protocoles.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            t: "Réserve de Valeur",
            d: "Actifs numériques souverains à rareté programmée (ex. Bitcoin) agissant comme une couverture contre l'inflation et la dépréciation monétaire.",
          },
          {
            t: "Plateformes de Contrats Intelligents",
            d: "Couches de calcul numérique de facto (ex. Ethereum, Solana) qui capturent les frais de transaction pour récompenser les participants au réseau.",
          },
          {
            t: "Flux de Trésorerie Tokenisés",
            d: "Protocoles DeFi qui génèrent des revenus (rendements, frais d'échange) et distribuent de la valeur aux détenteurs de jetons via des rachats ou du staking.",
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
        <div className="text-xs font-semibold text-primary">Indicateurs de Frais de Protocole</div>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          Avant d'allouer du capital, évaluez le ratio **Prix-sur-Frais (P/F)**. Les protocoles à rendement réel accumulent des frais nets grâce à l'utilité de la plateforme plutôt qu'à de simples émissions inflationnistes. Choisissez toujours des actifs avec des rendements réels positifs.
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
    toast.success(`Ordre de ${type === "Buy" ? "Achat" : "Vente"} exécuté !`, {
      description: `Ordre soumis pour ${type === "Buy" ? "acheter" : "vendre"} ${inputAmount} BTC à $${Number(inputPrice).toLocaleString()} (Total: $${total.toLocaleString()})`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-mono text-primary uppercase tracking-widest">
          Chapitre 4 // Marchés
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Bases du Trading Crypto</h2>
        <p className="text-muted-foreground text-base mt-1">
          Comprendre la découverte des prix à travers les carnets d'ordres liquides, les ratios de marge et les ordres de base limit / market.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
        {/* Animated Candlestick Chart */}
        <div className="glass p-5 rounded-2xl border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold">Flux BTC/USDT Simulé</span>
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
            INTERVALLE 1M · FLUX DIFFÉRÉ
          </div>
        </div>

        {/* Live Order Book & Form */}
        <div className="space-y-4">
          <div className="glass p-4 rounded-xl border border-white/5">
            <div className="text-xs font-mono uppercase text-muted-foreground/80 mb-2">
              Carnet d'Ordres
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
                placeholder="Prix"
                value={inputPrice}
                onChange={(e) => setInputPrice(e.target.value)}
                className="w-1/2 bg-white/5 border border-white/10 rounded-lg text-xs p-2 focus:outline-none focus:border-primary/50 text-center"
              />
              <input
                type="number"
                placeholder="Quantité"
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
                Acheter (Limit)
              </button>
              <button
                onClick={() => handleOrderSubmit("Sell")}
                className="w-1/2 border border-[#FF5F56]/20 bg-[#FF5F56]/10 text-[#FF5F56] font-semibold text-xs py-2 rounded-xl hover:scale-105 transition-all cursor-pointer"
              >
                Vendre (Limit)
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
          Chapitre 5 // Intelligence
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">IA & Analyse de Marché</h2>
        <p className="text-muted-foreground text-base mt-1">
          Utilisation de systèmes algorithmiques et d'indices de sentiment en langage naturel pour identifier des configurations de trading, des anomalies et des retournements structurels.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <div className="glass p-5 rounded-2xl border border-white/5">
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">
              Flux de Sentiment IA
            </h4>
            <div className="space-y-3">
              {[
                { label: "Flux Entrants Institutionnels", score: "Extrêmement Haussier", val: 92 },
                { label: "Indice de Peur des Réseaux Sociaux", score: "Neutre / Peur", val: 38 },
                { label: "Indice de Levier des Dérivés", score: "Légère Surchauffe", val: 74 },
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
              Résumé de l'Analyse IA Elite Chain
            </div>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              "L'analyse du système suggère que la liquidité macro reste positive. Les consolidations à court terme autour des EMA dynamiques ont éliminé l'effet de levier tardif. Les taux de financement se réinitialisent vers leur niveau de référence, offrant des zones d'accumulation logiques définies par le risque."
            </p>
          </div>
          <div className="mt-4 text-xs text-muted-foreground italic font-mono">
            MIS À JOUR : À L'INSTANT · MODÈLE v4.2
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
          Chapitre 6 // Stratégie
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Diversification de Portefeuille</h2>
        <p className="text-muted-foreground text-base mt-1">
          L'allocation stratégique d'actifs réduit le risque de baisse et protège contre les défaillances spécifiques aux actifs tout en capturant le potentiel de hausse multi-sectoriel.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass p-5 rounded-2xl border border-white/5 space-y-4">
          <h4 className="text-sm font-medium">Modèle Équilibré Elite Chain</h4>
          <div className="space-y-3">
            {[
              { label: "Couche Principale (BTC / ETH)", val: 60, c: "bg-primary" },
              { label: "Couches 1 & Infrastructure (SOL, DOT)", val: 20, c: "bg-teal-400" },
              { label: "Finance Décentralisée (DeFi)", val: 10, c: "bg-indigo-400" },
              { label: "Trésorerie & Stablecoins (USDC)", val: 10, c: "bg-muted" },
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
            Pourquoi le Rééquilibrage est Important
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            La volatilité du marché entraîne une dérive des pondérations des actifs. Établissez des règles trimestrielles pour prendre des bénéfices dans les secteurs surperformants et les réallouer aux couches sous-performantes afin de maintenir vos profils de risque initiaux.
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
          Chapitre 7 // Contrôle des Risques
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Gestion des Risques</h2>
        <p className="text-muted-foreground text-base mt-1">
          Dans les marchés très volatils de crypto-monnaies, la gestion des risques est la frontière absolue entre le succès à long terme et la liquidation complète du capital.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="glass p-5 rounded-2xl border border-white/5 space-y-4">
          <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Calculateur de Taille de Position & de Levier
          </h4>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Allocation de Risque du Compte</span>
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
                <span>Multiplicateur d'Effet de Levier</span>
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
              <AlertTriangle className="h-4 w-4" /> Danger de Liquidation
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              Si le BTC passe de 67 400 $ à moins de{" "}
              <strong className="text-foreground">
                ${Math.round(liquidationPrice).toLocaleString()}
              </strong>
              , votre position sera liquidée.
            </p>
          </div>
          <div className="mt-4 text-xs text-muted-foreground/80 font-mono">
            {leverage > 5 ? "⚠️ AVERTISSEMENT DE LEVIER ÉLEVÉ" : "✅ Levier conservateur."}
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
          Chapitre 8 // Cycles
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Tendances du Marché</h2>
        <p className="text-muted-foreground text-base mt-1">
          Comprendre le cycle de division par deux (halving) de 4 ans du Bitcoin et les flux institutionnels dicte les directions du marché à moyen et long terme.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="glass p-5 rounded-2xl border border-white/5 space-y-2">
          <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
            L'Effet du Halving
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tous les 210 000 blocs, les émissions de nouveaux Bitcoins sont réduites de moitié. Historiquement, ce choc d'offre agit comme catalyseur pour les marchés haussiers débutant 6 à 12 mois après le halving.
          </p>
        </div>

        <div className="glass p-5 rounded-2xl border border-white/5 space-y-2">
          <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
            Flux Entrants Institutionnels
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            L'approbation des fonds négociés en bourse (ETF) au comptant connecte directement les flux de capitaux traditionnels aux actifs numériques liquides, réduisant la volatilité historique et établissant un nouveau plancher pour la valeur des actifs.
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
        "Activation de l'authentification à 2 facteurs sur tous les comptes d'échange et de messagerie à l'aide d'un authentificateur d'application (pas par SMS).",
      checked: false,
    },
    {
      id: 2,
      label:
        "Stockage des phrases de secours physiques sur du métal, pas sur des appareils connectés au cloud ou des documents texte.",
      checked: false,
    },
    {
      id: 3,
      label:
        "Utilisation d'un portefeuille matériel dédié (cold storage) pour les avoirs en actifs dépassant les dépenses mensuelles.",
      checked: false,
    },
    {
      id: 4,
      label:
        "Vérification des adresses de contrat de destinataire et des liens URL avant d'exécuter des transactions de portefeuille de navigateur.",
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
          Chapitre 9 // Auto-conservation
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Bonnes Pratiques de Sécurité</h2>
        <p className="text-muted-foreground text-base mt-1">
          Contrairement à la finance traditionnelle, il n'y a pas d'annulation de transaction ni de réinitialisation de mot de passe sur les blockchains publiques. Vous êtes entièrement responsable de la sécurisation de vos actifs numériques.
        </p>
      </div>

      <div className="glass p-5 rounded-2xl border border-white/5 space-y-4">
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
          <span className="text-xs font-semibold">Progression de l'Audit de Sécurité</span>
          <span className="text-xs text-primary font-mono">
            {completed} / {checks.length} Terminé
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
      q: "Qu'est-ce que Elite Chain ?",
      a: "Elite Chain est un écosystème sélectionné qui fournit une éducation crypto avancée, des signaux de recherche et des outils pour les investisseurs sérieux en actifs numériques de niveau institutionnel.",
    },
    {
      q: "Puis-je gérer des actifs numériques directement dans le portail ?",
      a: "Non, Elite Chain ne fonctionne pas comme une plateforme d'échange ou un portefeuille dépositaire. Nous fournissons de la recherche, des outils d'IA, des calculateurs et des modèles éducatifs, tandis que vous conservez la garde absolue de vos fonds.",
    },
    {
      q: "Comment sécuriser ma session de compte ?",
      a: "Toutes les sessions sont cryptées côté serveur et enregistrées de manière sécurisée sur Vercel Blob Storage. Assurez-vous de conserver votre jeton de session en toute sécurité et de vous déconnecter lorsque vous ne l'utilisez pas.",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-mono text-primary uppercase tracking-widest">
          Chapitre 10 // Support
        </div>
        <h2 className="font-display text-3xl md:text-4xl mt-1">Foire Aux Questions</h2>
        <p className="text-muted-foreground text-base mt-1">
          Trouvez des réponses aux questions opérationnelles, techniques et réglementaires courantes.
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
    if (!fullName.trim()) errs.name = "Le nom complet est requis.";
    if (!email.trim()) {
      errs.email = "L'adresse e-mail est requise.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Format d'e-mail invalide.";
    }
    if (!phone.trim()) {
      errs.phone = "Le numéro de téléphone est requis.";
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
        toast.success("Demande reçue avec succès !");
      } else {
        toast.error("Échec de l'envoi de la demande. Veuillez réessayer.");
      }
    } catch (err) {
      toast.error("Erreur réseau. Veuillez vérifier votre connexion.");
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
            Contacter le Bureau de Conseil
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl">Soumettre une Demande</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Demandez des conseils directs ou des portefeuilles personnalisés à notre bureau de stratèges.
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
                <h3 className="font-display text-2xl">Merci !</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                  Votre demande a été reçue avec succès. Un stratège Elite Chain examinera votre profil et vous contactera.
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
                      Nom complet
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
                      Adresse e-mail
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
                      Numéro de téléphone
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
                    Message (facultatif)
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
                      Traitement...
                    </>
                  ) : (
                    "Soumettre la demande"
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
