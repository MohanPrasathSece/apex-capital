import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const FAQ = [
  {
    q: "Elite Chain est-il réglementé ?",
    a: "Elite Chain opère sous des entités agréées dans l'UE, au Royaume-Uni et aux États-Unis, avec les certifications SOC 2 Type II et ISO 27001.",
  },
  {
    q: "Comment les actifs sont-ils conservés ?",
    a: "Les actifs sont conservés dans un stockage à froid multi-signatures avec gestion des clés basée sur HSM et comptes clients séparés.",
  },
  {
    q: "Quels sont les frais ?",
    a: "Des frais de gestion fixes de 0,25%. Pas de commissions de négociation sur les rééquilibrages de portefeuille.",
  },
  {
    q: "Puis-je effectuer des retraits à tout moment ?",
    a: "Oui. Les retraits sont traités en un jour ouvrable, avec des options d'auto-conservation disponibles.",
  },
];

export function ContactSection() {
  const [open, setOpen] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.name = "Le nom complet est requis";

    if (!email.trim()) {
      errs.email = "L'adresse e-mail est requise";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Format d'e-mail invalide";
    }

    const cleanNum = phone.replace(/\s+/g, "");
    if (!cleanNum) {
      errs.phone = "Veuillez entrer un numéro de téléphone";
    } else if (!/^(\+41|0041|41|0)?[1-9]\d{8}$/.test(cleanNum)) {
      errs.phone = "Veuillez entrer un numéro suisse valide (ex: 079 123 45 67)";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
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
        toast.success("Demande envoyée avec succès.");
      } else {
        toast.error("Échec de l'envoi de la demande. Veuillez réessayer.");
      }
    } catch (err: any) {
      const rawMsg = (err?.message || err?.toString() || "");
      if (rawMsg.toLowerCase().includes("already exist") || rawMsg.toLowerCase().includes("already exists") || rawMsg.toLowerCase().includes("contacted")) {
        toast.success("Vous nous avez déjà contactés. Veuillez patienter.");
        setSubmitted(true);
        setLoading(false);
        return;
      }
      toast.error("Erreur réseau. Veuillez vérifier votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pricing" className="relative overflow-hidden py-32">
      <div className="absolute -top-20 right-0 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute bottom-20 -left-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      {/* floating coins */}
      {[..."BTC,ETH,SOL,DOT".split(",")].map((s, i) => (
        <motion.div
          key={s}
          animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
          className="absolute hidden lg:grid h-16 w-16 place-items-center rounded-full glass font-bold text-primary"
          style={{ top: `${15 + i * 22}%`, left: i % 2 ? "85%" : "8%" }}
        >
          {s}
        </motion.div>
      ))}

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-2 md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex rounded-full glass px-3 py-1 text-xs text-muted-foreground">
              Contact
            </div>
            <h2 className="mt-4 text-4xl md:text-6xl">
              Discutons <span className="text-gradient italic">stratégie</span>
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Que vous allouiez 10 000 $ ou 10 M$, notre équipe est là pour vous aider à construire un portefeuille avec un objectif précis.
            </p>

            <div className="mt-10 space-y-3">
              {[
                ["hello@elitechain.capital", "E-mail"],
                ["+1 (415) 555-0182", "Téléphone"],
                ["San Francisco · Londres · Singapour", "Bureaux"],
              ].map(([v, l]) => (
                <div
                  key={l}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3"
                >
                  <span className="text-sm">{v}</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {l}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="font-display text-2xl">Questions fréquentes</h3>
              <div className="mt-4 space-y-2">
                {FAQ.map((f, i) => (
                  <button
                    key={f.q}
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="w-full text-left cursor-pointer"
                  >
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{f.q}</span>
                        <motion.span
                          animate={{ rotate: open === i ? 45 : 0 }}
                          className="text-primary"
                        >
                          +
                        </motion.span>
                      </div>
                      <AnimatePresence>
                        {open === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="pt-2 text-xs text-muted-foreground">{f.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:sticky md:top-24"
          >
            <div className="glass-strong rounded-3xl p-8 shadow-card">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/15 text-primary mb-4"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          d="M5 12l5 5L20 7"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                    <h3 className="font-display text-2xl">Demande reçue</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                      Merci ! Votre demande a été reçue avec succès.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} className="space-y-4">
                    <h3 className="font-display text-2xl">Envoyer un message</h3>

                    {/* Full Name */}
                    <div className="space-y-1">
                      <FloatingInput
                        label="Nom complet"
                        value={fullName}
                        onChange={(val) => {
                          setFullName(val);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                        }}
                      />
                      {errors.name && (
                        <span className="text-[10px] text-red-400 pl-2">{errors.name}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <FloatingInput
                        label="E-mail"
                        type="email"
                        value={email}
                        onChange={(val) => {
                          setEmail(val);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-400 pl-2">{errors.email}</span>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <FloatingInput
                        label="Numéro de téléphone"
                        type="tel"
                        value={phone}
                        onChange={(val) => {
                          setPhone(val);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" , countryCode: typeof formData !== 'undefined' ? formData.get('countryCode') : 'CH'}));
                        }}
                      />
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

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      disabled={loading}
                      className="relative w-full overflow-hidden rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                          Envoi...
                        </>
                      ) : (
                        "Envoyer le message →"
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full rounded-2xl border border-white/10 bg-white/5 px-4 pt-5 pb-2 text-sm outline-none transition-all focus:border-primary/60"
        placeholder=" "
      />
      <label
        className={`pointer-events-none absolute left-4 transition-all ${active ? "top-1.5 text-[10px] uppercase tracking-wider text-primary" : "top-3.5 text-sm text-muted-foreground"}`}
      >
        {label}
      </label>
    </div>
  );
}
