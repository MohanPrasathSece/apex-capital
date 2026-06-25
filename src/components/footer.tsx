import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export function Footer() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Veuillez saisir une adresse e-mail.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Veuillez saisir une adresse e-mail valide.");
      return;
    }
    toast.success("Abonné aux mises à jour de la newsletter !");
    setEmail("");
  };

  const cols = user
    ? [
        {
          title: "Tableau de bord",
          links: [
            { label: "Accueil", path: "/" },
            { label: "Centre d'apprentissage", path: "/app" },
            { label: "Robots de trading", path: "/trading" },
          ],
        },
        {
          title: "Légal",
          links: [
            { label: "Conditions Générales", path: "/terms" },
            { label: "Politique de Confidentialité", path: "/privacy" },
          ],
        },
      ]
    : [
        {
          title: "Explorer",
          links: [
            { label: "Accueil", path: "/" },
            { label: "Plateforme", path: "/#platform" },
            { label: "Marchés", path: "/#markets" },
            { label: "Recherche", path: "/#research" },
            { label: "Tarifs", path: "/#pricing" },
          ],
        },
        {
          title: "Produits",
          links: [
            { label: "Centre d'apprentissage", path: "/app" },
            { label: "Robots de trading", path: "/trading" },
          ],
        },
        {
          title: "Légal",
          links: [
            { label: "Conditions Générales", path: "/terms" },
            { label: "Politique de Confidentialité", path: "/privacy" },
          ],
        },
      ];

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-background">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[60%] rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div
          className={`grid gap-12 ${
            cols.length === 3 ? "md:grid-cols-[1.5fr_repeat(3,1fr)]" : "md:grid-cols-[1.5fr_repeat(2,1fr)]"
          }`}
        >
          <div>
            <div className="flex items-center gap-2">
              <div className="relative h-7 w-7">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-primary/40 shadow-glow" />
                <div className="absolute inset-[3px] rounded-md bg-background/80" />
                <div className="absolute inset-0 grid place-items-center text-xs font-bold text-primary">
                  E
                </div>
              </div>
              <span className="font-display text-xl">Elite Chain</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Une plateforme d'investissement raffinée pour l'investisseur d'actifs numériques moderne.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="mt-6 flex max-w-xs items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 pl-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
              />
              <button
                type="submit"
                className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground cursor-pointer shadow-glow transition-transform active:scale-95"
              >
                S'abonner
              </button>
            </form>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs uppercase tracking-widest text-muted-foreground/80 font-semibold">
                {c.title}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {l.path.startsWith("/#") ? (
                      <a
                        href={l.path}
                        className="text-foreground/80 hover:text-primary transition-colors"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        to={l.path}
                        className="text-foreground/80 hover:text-primary transition-colors"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Elite Chain. Tous droits réservés.</div>
        </div>
      </div>
    </footer>
  );
}

