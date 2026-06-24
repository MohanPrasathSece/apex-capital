import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "@/lib/auth";

export function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 100],
    ["oklch(0.12 0.025 250 / 0)", "oklch(0.12 0.025 250 / 0.7)"],
  );
  const { user, openLogin, openSignup, logout } = useAuth();

  return (
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
              L
            </div>
          </div>
          <span className="font-display text-xl tracking-tight">Lumen</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {["Platform", "Markets", "Research", "Pricing"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="relative hover:text-foreground transition-colors group"
            >
              {l}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/app" className="text-sm text-muted-foreground hover:text-foreground">
                Learn Hub
              </Link>
              <Link
                to="/trading"
                className="text-sm text-muted-foreground hover:text-foreground ml-4"
              >
                Trading Bots
              </Link>
              <button
                onClick={logout}
                className="rounded-full px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={openLogin}
                className="rounded-full px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Log in
              </button>
              <button
                onClick={openSignup}
                className="group relative rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-glow hover:scale-105 transition-transform"
              >
                Get started
              </button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
