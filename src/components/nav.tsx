import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 100],
    ["oklch(0.12 0.025 250 / 0)", "oklch(0.12 0.025 250 / 0.7)"],
  );
  const { user, openLogin, openSignup, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <motion.header
        style={{ backgroundColor: bg, backdropFilter: "blur(16px) saturate(160%)" }}
        className="fixed top-0 inset-x-0 z-50 border-b border-white/5"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative h-7 w-7">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-primary/40 shadow-glow" />
              <div className="absolute inset-[3px] rounded-md bg-background/80 backdrop-blur" />
              <div className="absolute inset-0 grid place-items-center text-xs font-bold text-primary">
                E
              </div>
            </div>
            <span className="font-display text-xl tracking-tight">Elite Chain</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {[
              { label: "Plateforme", id: "platform" },
              { label: "Marchés", id: "markets" },
              { label: "Recherche", id: "research" },
              { label: "Tarifs", id: "pricing" },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="relative hover:text-foreground transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Auth and Mobile Hamburger Button */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  <Link to="/app" className="text-sm text-muted-foreground hover:text-foreground">
                    Centre d'apprentissage
                  </Link>
                  <Link
                    to="/trading"
                    className="text-sm text-muted-foreground hover:text-foreground ml-4"
                  >
                    Robots de trading
                  </Link>
                  <button
                    onClick={logout}
                    className="rounded-full px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    Se déconnecter
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={openLogin}
                    className="rounded-full px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Se connecter
                  </button>
                  <button
                    onClick={openSignup}
                    className="group relative rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-glow hover:scale-105 transition-transform"
                  >
                    Commencer
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="flex md:hidden items-center justify-center p-2 rounded-xl bg-white/5 border border-white/5 text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Basculer le menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col justify-between pt-24 pb-8 px-6 md:hidden border-b border-white/5"
          >
            <div className="flex flex-col gap-6 text-lg font-display mt-4">
              {user ? (
                <>
                  <Link
                    to="/app"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-foreground hover:text-primary transition-colors py-2 border-b border-white/5"
                  >
                    Centre d'apprentissage
                  </Link>
                  <Link
                    to="/trading"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-foreground hover:text-primary transition-colors py-2 border-b border-white/5"
                  >
                    Robots de trading
                  </Link>
                </>
              ) : (
                [
                  { label: "Plateforme", id: "platform" },
                  { label: "Marchés", id: "markets" },
                  { label: "Recherche", id: "research" },
                  { label: "Tarifs", id: "pricing" },
                ].map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-foreground hover:text-primary transition-colors py-2 border-b border-white/5"
                  >
                    {link.label}
                  </a>
                ))
              )}
            </div>

            <div className="flex flex-col gap-3">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-2xl bg-white/5 border border-white/5 text-center text-sm font-semibold text-foreground hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Se déconnecter
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      openLogin();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 rounded-2xl bg-white/5 border border-white/5 text-center text-sm font-semibold text-foreground hover:bg-white/10 transition-colors"
                  >
                    Se connecter
                  </button>
                  <button
                    onClick={() => {
                      openSignup();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 rounded-2xl bg-primary text-center text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition-opacity"
                  >
                    Commencer
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
