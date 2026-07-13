import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CountrySelect } from "@/components/ui/country-select";
import { COUNTRY_PHONE_PATTERNS } from "@/lib/phoneCountries";

export function AuthModals() {
  const { modal, closeModal, login, signup, openLogin, openSignup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("CH");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (modal === "signup" && !name.trim()) errs.name = "Le nom complet est requis.";

    if (!email.trim()) {
      errs.email = "L'adresse e-mail est requise.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Format d'adresse e-mail invalide.";
    }

    if (modal === "signup") {
      const cleanNum = phone.replace(/\s+/g, "");
      const selectedCountry = COUNTRY_PHONE_PATTERNS[countryCode];
      if (!cleanNum) {
        errs.phone = "Veuillez entrer un numéro de téléphone";
      } else if (selectedCountry && !selectedCountry.pattern.test(cleanNum)) {
        errs.phone = `Veuillez entrer un numéro valide (ex: ${selectedCountry.example})`;
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (modal === "login") {
        const res = await login(email);
        if (res.success) {
          toast.success("Connexion réussie.");
          setEmail("");
          navigate("/trading");
        } else {
          toast.error(res.error || "Échec de la connexion.");
        }
      } else {
        const res = await signup(name, email, phone, countryCode);
        if (res.success) {
          toast.success("Compte créé avec succès.");
          setEmail("");
          setName("");
          setPhone("");
          navigate("/trading");
        } else {
          toast.error(res.error || "Échec de l'inscription.");
        }
      }
    } catch (err) {
      toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-center px-4"
        >
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-background/60 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative w-full max-w-md glass-strong rounded-3xl p-8 shadow-card"
          >
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              ✕
            </button>

            <div className="mb-6">
              <h2 className="font-display text-3xl">
                {modal === "login" ? "Bon retour parmi nous" : "Créez votre compte"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {modal === "login"
                  ? "Continuez à développer votre portefeuille."
                  : "Commencez à investir en quelques minutes."}
              </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              {modal === "signup" && (
                <div className="space-y-1">
                  <Field
                    label="Nom complet"
                    value={name}
                    onChange={(v) => {
                      setName(v);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                    }}
                  />
                  {errors.name && (
                    <span className="text-[10px] text-red-400 pl-2">{errors.name}</span>
                  )}
                </div>
              )}
              <div className="space-y-1">
                <Field
                  label="E-mail"
                  type="email"
                  value={email}
                  onChange={(v) => {
                    setEmail(v);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                />
                {errors.email && (
                  <span className="text-[10px] text-red-400 pl-2">{errors.email}</span>
                )}
              </div>
              {modal === "signup" && (
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <CountrySelect value={countryCode} onChange={setCountryCode} />
                    <div className="flex-1">
                      <Field
                        label="Numéro de téléphone"
                        type="tel"
                        value={phone}
                        onChange={(v) => {
                          setPhone(v);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                        }}
                      />
                    </div>
                  </div>
                  {errors.phone && (
                    <span className="text-[10px] text-red-400 pl-2">{errors.phone}</span>
                  )}
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                className="relative w-full overflow-hidden rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-70 cursor-pointer"
              >
                {loading ? (
                  <motion.span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    {modal === "login" ? "Connexion..." : "Création du compte..."}
                  </motion.span>
                ) : (
                  <>{modal === "login" ? "Continuer" : "Créer le compte"}</>
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              {modal === "login" ? (
                <>
                  Nouveau sur Elite Chain ?{" "}
                  <button
                    onClick={openSignup}
                    className="text-primary hover:underline cursor-pointer"
                  >
                    Créer un compte
                  </button>
                </>
              ) : (
                <>
                  Vous avez déjà un compte ?{" "}
                  <button
                    onClick={openLogin}
                    className="text-primary hover:underline cursor-pointer"
                  >
                    Se connecter
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
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
        className="peer w-full rounded-2xl border border-white/10 bg-white/5 px-4 pt-5 pb-2 text-sm outline-none transition-all focus:border-primary/60 focus:bg-white/[0.07]"
      />
      <label
        className={`pointer-events-none absolute left-4 transition-all ${active ? "top-1.5 text-[10px] uppercase tracking-wider text-primary" : "top-3.5 text-sm text-muted-foreground"}`}
      >
        {label}
      </label>
    </div>
  );
}
