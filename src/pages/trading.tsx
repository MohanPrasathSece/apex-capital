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
  Play,
  Pause,
  Terminal,
  Activity,
  ArrowRight,
  TrendingUp,
  Cpu,
  Sliders,
  DollarSign,
  AlertTriangle,
  RefreshCw,
  Layers,
  CheckCircle,
  HelpCircle,
  RotateCcw,
  Shield,
} from "lucide-react";

export default function TradingTerminal() {
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
          <h1 className="font-display text-4xl md:text-5xl">Connectez-vous pour continuer</h1>
          <p className="mt-2 text-muted-foreground">
            Accédez à votre terminal de trading algorithmique automatisé.
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
      <TerminalContent />
      <AuthModals />
    </div>
  );
}

function TerminalContent() {
  const { user } = useAuth();
  const [activeBot, setActiveBot] = useState<"grid" | "dca" | "arbitrage">("grid");
  const [isRunning, setIsRunning] = useState(false);

  // Bot Settings
  const [allocation, setAllocation] = useState(5000);
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">("medium");
  const [frequency, setFrequency] = useState(3); // actions per minute

  // Real-time Logs State
  const [logs, setLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Performance Points State (SVG charting)
  const [performancePoints, setPerformancePoints] = useState<number[]>([
    10, 15, 12, 18, 22, 20, 28,
  ]);
  const [cumulativeProfit, setCumulativeProfit] = useState(0);

  // Triangular Arbitrage Active Node State
  const [arbitrageStep, setArbitrageStep] = useState(0);

  // Scroll logs to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Log and performance generator
  useEffect(() => {
    if (!isRunning) return;

    // Add initial log
    setLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Bot algorithmique ${activeBot.toUpperCase()} initialisé avec une allocation de ${allocation.toLocaleString()} $.`,
    ]);

    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      let logMsg = "";
      let profitDelta = 0;

      // Bot Type specific logic
      if (activeBot === "grid") {
        const gridPrice = (67200 + (Math.random() - 0.49) * 300).toFixed(2);
        const profit = (Math.random() * 25).toFixed(2);
        const action = Math.random() > 0.5 ? "Limite d'ACHAT exécutée" : "Limite de VENTE exécutée";
        logMsg = `[${now}] Bot Grid : ${action} à ${Number(gridPrice).toLocaleString()} $ | Profit généré : +${profit} $`;
        profitDelta = Number(profit);
      } else if (activeBot === "dca") {
        const dcaPrice = (67350 + (Math.random() - 0.5) * 80).toFixed(2);
        const size = (0.01 + Math.random() * 0.05).toFixed(4);
        logMsg = `[${now}] Bot DCA : Exécution de l'achat récurrent de ${size} BTC à ${Number(dcaPrice).toLocaleString()} $.`;
        profitDelta = (Math.random() - 0.3) * 8; // Small swing
      } else {
        // Arbitrage steps loop
        setArbitrageStep((prev) => (prev + 1) % 4);
        const prices = {
          binance: Math.round(67400 + (Math.random() - 0.5) * 40),
          coinbase: Math.round(67420 + (Math.random() - 0.5) * 50),
          kraken: Math.round(67380 + (Math.random() - 0.5) * 45),
        };

        if (arbitrageStep === 0) {
          logMsg = `[${now}] Bot d'arbitrage : Analyse des écarts de prix entre les plateformes...`;
        } else if (arbitrageStep === 1) {
          logMsg = `[${now}] Bot d'arbitrage : Écart détecté ! Kraken : ${prices.kraken.toLocaleString()} $ | Coinbase : ${prices.coinbase.toLocaleString()} $`;
        } else if (arbitrageStep === 2) {
          const spread = prices.coinbase - prices.kraken;
          const finalProfit = Number((spread * 0.15).toFixed(2));
          logMsg = `[${now}] Bot d'arbitrage : Achat de 0,15 BTC sur Kraken, Vente de 0,15 BTC sur Coinbase. Profit : +${finalProfit} $`;
          profitDelta = finalProfit;
        } else {
          logMsg = `[${now}] Bot d'arbitrage : Apurement des soldes et réinitialisation des couvertures delta.`;
        }
      }

      if (logMsg) {
        setLogs((prev) => [...prev.slice(-29), logMsg]);
      }

      if (profitDelta !== 0) {
        setCumulativeProfit((prev) => Number((prev + profitDelta).toFixed(2)));
        setPerformancePoints((prev) => {
          const next = [...prev.slice(1)];
          const last = prev[prev.length - 1];
          next.push(Math.max(5, Math.min(95, last + profitDelta * 0.8)));
          return next;
        });
      }
    }, 4000 / frequency);

    return () => clearInterval(interval);
  }, [isRunning, activeBot, allocation, frequency, riskLevel, arbitrageStep]);

  const handleStartToggle = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      toast.success(`Bot ${activeBot.toUpperCase()} démarré avec succès !`);
    } else {
      toast.warning(`Bot ${activeBot.toUpperCase()} mis en pause.`);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setLogs([]);
    setCumulativeProfit(0);
    setPerformancePoints([10, 15, 12, 18, 22, 20, 28]);
    toast.info("Statut de la console effacé.");
  };

  return (
    <main className="relative bg-hero min-h-screen text-foreground">
      {/* Intro Header */}
      <section className="relative overflow-hidden pt-32 pb-10">
        <div className="absolute inset-0 grid-bg" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex rounded-full glass px-4 py-1 text-xs text-primary mb-4"
          >
            Terminal de Giga-Calcul Sécurisé // Session Active
          </motion.div>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight">
            Bots de <span className="text-gradient italic">Trading IA</span> & Console
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-muted-foreground">
            Configurez, testez et exécutez des bots algorithmiques de pointe appliquant des systèmes de grille à haute fréquence et des stratégies d'arbitrage triangulaire.
          </p>
        </div>
      </section>

      {/* Main Terminal Widget */}
      <section className="relative pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Main Bot Controller */}
          <div className="glass-strong rounded-3xl p-6 border border-white/10 space-y-6 flex flex-col justify-between">
            {/* Header controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div className="flex gap-2">
                {(["grid", "dca", "arbitrage"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      if (isRunning) {
                        toast.error("Veuillez mettre le bot actif en pause avant de changer de stratégie.");
                        return;
                      }
                      setActiveBot(type);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeBot === type
                        ? "bg-primary text-primary-foreground shadow-glow"
                        : "bg-white/5 border border-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                    }`}
                  >
                    {type === "arbitrage" ? "Bot d'Arbitrage" : `Bot ${type.toUpperCase()}`}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleStartToggle}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-glow transition-transform active:scale-95 ${
                    isRunning
                      ? "bg-yellow-500 text-black hover:bg-yellow-400"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Pause className="h-3.5 w-3.5 fill-current" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-current" /> Lancer le bot
                    </>
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 rounded-xl bg-white/5 border border-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 cursor-pointer"
                  title="Effacer la console"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Simulated execution visualizer */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Bot visual widget */}
              <div className="glass p-5 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[220px]">
                {activeBot === "arbitrage" ? (
                  <div className="space-y-4">
                    <span className="text-xs font-semibold text-muted-foreground/80 flex items-center gap-1">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin-slow text-primary" />{" "}
                      Cycle d'arbitrage triangulaire
                    </span>
                    {/* SVG Loop Map */}
                    <div className="relative h-28 flex items-center justify-center">
                      <svg viewBox="0 0 200 100" className="w-full h-full">
                        {/* Exchange Nodes */}
                        <circle
                          cx="100"
                          cy="20"
                          r="12"
                          className={`transition-colors duration-300 ${
                            arbitrageStep === 0
                              ? "fill-primary/20 stroke-primary"
                              : "fill-white/5 stroke-white/20"
                          }`}
                          strokeWidth="1.5"
                        />
                        <text
                          x="100"
                          y="23"
                          textAnchor="middle"
                          fontSize="6"
                          fill="#fff"
                          fontWeight="bold"
                        >
                          BINANCE
                        </text>

                        <circle
                          cx="40"
                          cy="80"
                          r="12"
                          className={`transition-colors duration-300 ${
                            arbitrageStep === 1
                              ? "fill-primary/20 stroke-primary"
                              : "fill-white/5 stroke-white/20"
                          }`}
                          strokeWidth="1.5"
                        />
                        <text
                          x="40"
                          y="83"
                          textAnchor="middle"
                          fontSize="6"
                          fill="#fff"
                          fontWeight="bold"
                        >
                          KRAKEN
                        </text>

                        <circle
                          cx="160"
                          cy="80"
                          r="12"
                          className={`transition-colors duration-300 ${
                            arbitrageStep === 2
                              ? "fill-primary/20 stroke-primary"
                              : "fill-white/5 stroke-white/20"
                          }`}
                          strokeWidth="1.5"
                        />
                        <text
                          x="160"
                          y="83"
                          textAnchor="middle"
                          fontSize="6"
                          fill="#fff"
                          fontWeight="bold"
                        >
                          COINBASE
                        </text>

                        {/* Arrows */}
                        <path
                          d="M 90 25 L 50 70"
                          stroke="var(--teal)"
                          strokeWidth="1"
                          strokeDasharray="3"
                          className={arbitrageStep === 0 ? "animate-pulse" : ""}
                        />
                        <path
                          d="M 55 80 L 145 80"
                          stroke="var(--teal)"
                          strokeWidth="1"
                          strokeDasharray="3"
                          className={arbitrageStep === 1 ? "animate-pulse" : ""}
                        />
                        <path
                          d="M 150 70 L 110 25"
                          stroke="var(--teal)"
                          strokeWidth="1"
                          strokeDasharray="3"
                          className={arbitrageStep === 2 ? "animate-pulse" : ""}
                        />
                      </svg>
                    </div>
                  </div>
                ) : activeBot === "grid" ? (
                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-muted-foreground/80 flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5 text-primary" /> Lignes de grille actives (BTC/USDT)
                    </span>
                    <div className="space-y-1.5 font-mono text-[9px]">
                      {[67600, 67500, 67400, 67300, 67200].map((price, idx) => {
                        const isSellLimit = idx < 2;
                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between bg-black/20 px-3 py-1 rounded"
                          >
                            <span className={isSellLimit ? "text-red-400" : "text-primary"}>
                              {isSellLimit ? "[LIMITE VENTE]" : "[LIMITE ACHAT]"}
                            </span>
                            <span>${price.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <span className="text-xs font-semibold text-muted-foreground/80 flex items-center gap-1">
                      <Cpu className="h-3.5 w-3.5 text-primary" /> Configuration DCA (Dollar-Cost Averaging)
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-black/20 p-2.5 rounded-xl border border-white/5">
                        <div className="text-[10px] text-muted-foreground">Allocation par ordre</div>
                        <div className="font-display text-lg text-primary mt-0.5">
                          ${Math.round(allocation * 0.05)}
                        </div>
                      </div>
                      <div className="bg-black/20 p-2.5 rounded-xl border border-white/5">
                        <div className="text-[10px] text-muted-foreground">Fréquence d'intervalle</div>
                        <div className="font-display text-lg text-primary mt-0.5">{frequency}m</div>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Le bot DCA atténue la volatilité liée au timing du marché en effectuant périodiquement des micro-investissements.
                    </p>
                  </div>
                )}
              </div>

              {/* Bot Profit/Backtest performance Graph */}
              <div className="glass p-5 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[220px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-muted-foreground/80 flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5 text-primary" /> Rendement des profits du bot en direct
                  </span>
                  <span
                    className={`text-xs font-mono font-bold ${cumulativeProfit >= 0 ? "text-primary" : "text-red-400"}`}
                  >
                    +${cumulativeProfit.toLocaleString()}
                  </span>
                </div>

                {/* SVG Graph line */}
                <div className="h-28 relative overflow-hidden bg-black/20 rounded-xl p-2 flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="yieldGrad" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="var(--teal)" stopOpacity="0" />
                        <stop offset="100%" stopColor="var(--teal)" stopOpacity="0.15" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`M 0 100 L ${performancePoints.map((p, i) => `${(i / (performancePoints.length - 1)) * 100} ${100 - p}`).join(" L ")} L 100 100 Z`}
                      fill="url(#yieldGrad)"
                    />
                    <path
                      d={performancePoints
                        .map(
                          (p, i) =>
                            `${i === 0 ? "M" : "L"} ${(i / (performancePoints.length - 1)) * 100} ${100 - p}`,
                        )
                        .join(" ")}
                      fill="none"
                      stroke="var(--teal)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="text-[9px] font-mono text-muted-foreground/60 text-center mt-2">
                  DELTA DE PERFORMANCE CUMULÉE
                </div>
              </div>
            </div>

            {/* Terminal Live Output Console */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground/85 px-1">
                <Terminal className="h-3.5 w-3.5" /> Flux de sortie du bot en direct
              </div>
              <div
                ref={logContainerRef}
                className="h-60 bg-black/60 rounded-2xl p-4 font-mono text-xs md:text-sm text-primary overflow-y-auto space-y-1.5 border border-white/5 scrollbar-thin select-text"
              >
                {logs.length === 0 ? (
                  <div className="text-muted-foreground/50 italic h-full flex items-center justify-center">
                    En attente d'exécution... Cliquez sur « Lancer le bot » pour diffuser les journaux de transaction.
                  </div>
                ) : (
                  logs.map((log, idx) => (
                    <div
                      key={idx}
                      className="leading-relaxed hover:bg-white/5 py-0.5 rounded px-1.5 transition-colors"
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Settings Control Panel Sidebar */}
          <div className="space-y-6">
            <div className="glass-strong rounded-3xl p-6 border border-white/10 space-y-4">
              <h3 className="font-display text-xl border-b border-white/5 pb-2">Paramètres du bot</h3>

              {/* Allocation */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Allocation (USD)</span>
                  <span className="text-primary">${allocation.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={allocation}
                  disabled={isRunning}
                  onChange={(e) => setAllocation(Number(e.target.value))}
                  className="w-full accent-primary bg-white/10 h-1 rounded-lg disabled:opacity-50"
                />
              </div>

              {/* Action Frequency */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Intervalle de vitesse</span>
                  <span className="text-primary">{frequency} actions/min</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={frequency}
                  disabled={isRunning}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full accent-primary bg-white/10 h-1 rounded-lg disabled:opacity-50"
                />
              </div>

              {/* Risk Mode */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-muted-foreground">Mode d'exécution des risques</span>
                <div className="grid grid-cols-3 gap-1">
                  {(["low", "medium", "high"] as const).map((risk) => (
                    <button
                      key={risk}
                      disabled={isRunning}
                      onClick={() => setRiskLevel(risk)}
                      className={`py-1.5 rounded-lg text-[10px] font-bold uppercase border transition-all cursor-pointer ${
                        riskLevel === risk
                          ? "bg-primary/20 border-primary text-primary"
                          : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10"
                      } disabled:opacity-50`}
                    >
                      {risk === "low" ? "Faible" : risk === "medium" ? "Modéré" : "Élevé"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Warning block */}
            <div className="border border-yellow-500/10 bg-yellow-500/[0.03] p-5 rounded-3xl space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-yellow-400 font-bold">
                <AlertTriangle className="h-4 w-4" /> Divulgation algorithmique
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed mt-1">
                Les bots automatisés utilisent des profils de liquidité fictifs. Les mesures de performance simulées dans la console représentent des algorithmes de backtest simulés et ne constituent pas une exécution d'ordres réels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Pre-Engineered Quant Directory */}
      <section className="relative py-20 border-t border-white/5 bg-black/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <div className="inline-flex rounded-full glass px-3 py-1 text-xs text-muted-foreground">
              Répertoire quantitatif
            </div>
            <h2 className="mt-3 text-3xl md:text-5xl">Profils de stratégies pré-conçus</h2>
            <p className="mt-1 text-xs md:text-sm text-muted-foreground">
              Explorez des algorithmes standardisés conçus et testés historiquement par notre bureau de recherche.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                name: "Scalper Prime v2",
                type: "Stratégie Grid",
                win: "92.4%",
                profit: "+18.2%",
                risk: "Medium",
              },
              {
                name: "Arbitrage Cycle v4",
                type: "Arbitrage triangulaire",
                win: "100%",
                profit: "+8.4%",
                risk: "Low",
              },
              {
                name: "DCA Accumulator",
                type: "Dollar-Cost Averaging (DCA)",
                win: "84.1%",
                profit: "+24.8%",
                risk: "Low",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="glass p-8 md:p-10 rounded-3xl border border-white/5 space-y-6 hover:border-primary/30 transition-all flex flex-col justify-between min-h-[280px]"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h4 className="font-display text-3xl md:text-4xl text-gradient leading-tight">{b.name}</h4>
                    <span className="text-xs md:text-sm text-muted-foreground uppercase font-mono tracking-wider block mt-1">
                      {b.type}
                    </span>
                  </div>
                  <span
                    className={`text-xs uppercase px-3 py-1.5 rounded-full font-bold shrink-0 ${b.risk === "Low" ? "bg-primary/10 text-primary" : "bg-yellow-400/10 text-yellow-400"}`}
                  >
                    {b.risk === "Low" ? "Risque faible" : "Risque modéré"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-6 border-t border-white/5 pt-6 font-mono">
                  <div>
                    <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-semibold">Taux de réussite simulé</div>
                    <div className="font-display text-2xl md:text-3xl text-foreground mt-1.5">{b.win}</div>
                  </div>
                  <div>
                    <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-semibold">Rendement du backtest</div>
                    <div className="font-display text-2xl md:text-3xl text-primary mt-1.5">{b.profit}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Algorithmic Safeguards & Risk Guardrails */}
      <section className="relative py-20 border-t border-white/5 bg-black/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <div className="inline-flex rounded-full glass px-3 py-1 text-xs text-muted-foreground">
              Garde-fous des risques
            </div>
            <h2 className="mt-3 text-3xl md:text-5xl">Sécurités structurelles de la plateforme</h2>
            <p className="mt-1 text-xs md:text-sm text-muted-foreground">
              Limitations de paramètres institutionnels protégeant les actifs contre les anomalies de risque extrême (tail-risk).
            </p>
          </div>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Contrôle du slippage",
                desc: "Arrêt automatique de l'exécution si l'écart de marché dépasse 0,15 % afin de protéger les cours d'entrée à l'achat et à la vente.",
                icon: Sliders,
              },
              {
                title: "Actions verrouillées par API",
                desc: "Les clés d'écriture sont restreintes à des adresses de confiance spécifiques. Tout retrait direct via API est interdit.",
                icon: Shield,
              },
              {
                title: "Coupe-circuits",
                desc: "Surveille les fluctuations extrêmes du marché et déclenche automatiquement des pauses de sécurité pour les bots en cours d'exécution.",
                icon: Activity,
              },
              {
                title: "Plafonds d'allocation maximaux",
                desc: "Impose des limites d'exposition stratégiques (par exemple, un maximum de 25 % de la valeur du compte par actif individuel de bot).",
                icon: Layers,
              },
            ].map((guard, i) => {
              const IconComp = guard.icon;
              return (
                <div
                  key={i}
                  className="glass p-8 md:p-10 rounded-3xl border border-white/5 hover:bg-white/[0.03] transition-colors space-y-5 flex flex-col justify-between min-h-[280px]"
                >
                  <div className="space-y-4">
                    <div className="h-14 w-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <h4 className="font-display text-2xl md:text-3xl leading-tight">{guard.title}</h4>
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed mt-2">{guard.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Bot Enquiry Form Section */}
      <BotEnquirySection />
      <Footer />
    </main>
  );
}

function BotEnquirySection() {
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
    if (!fullName.trim()) errs.name = "Le nom complet est requis";
    if (!email.trim()) {
      errs.email = "L'adresse e-mail est requise";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Format d'e-mail invalide";
    }
    if (!phone.trim()) {
      errs.phone = "Le numéro de téléphone est requis";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const description = message || "";

    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          phone,
          message: description,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        toast.success("Merci de nous avoir contactés. Votre message a bien été reçu et notre équipe vous répondra dans les plus brefs délais.");
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
            Bureau de conseil
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl">Stratégie de bot personnalisée</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Demandez des scripts algorithmiques personnalisés ou des conseils en trading haute fréquence à notre équipe quantitative.
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
                <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  Merci ! Votre demande a été reçue avec succès.
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
                    Parlez-nous de vos variables cibles... (facultatif)
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
                    "Envoyer la demande"
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
