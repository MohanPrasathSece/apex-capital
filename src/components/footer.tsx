import { Link } from "react-router-dom";

export function Footer() {
  const cols = [
    { title: "Platform", links: ["Portfolios", "Markets", "Staking", "API", "Mobile"] },
    { title: "Resources", links: ["Research", "Learn", "Blog", "Glossary", "Status"] },
    { title: "Company", links: ["About", "Careers", "Press", "Partners", "Contact"] },
    { title: "Legal", links: ["Terms", "Privacy", "Disclosures", "Cookies", "Compliance"] },
  ];
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-background">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[60%] rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <div className="relative h-7 w-7">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-primary/40" />
                <div className="absolute inset-[3px] rounded-md bg-background/80" />
                <div className="absolute inset-0 grid place-items-center text-xs font-bold text-primary">
                  L
                </div>
              </div>
              <span className="font-display text-xl">Lumen</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A refined investment platform for the modern digital asset investor.
            </p>
            <form className="mt-6 flex max-w-xs items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 pl-4">
              <input
                placeholder="your@email.com"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
              />
              <button className="rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                Subscribe
              </button>
            </form>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs uppercase tracking-widest text-muted-foreground/80">
                {c.title}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {c.links.map((l) => {
                  let path = "";
                  if (l === "Terms") path = "/terms";
                  else if (l === "Privacy") path = "/privacy";

                  return (
                    <li key={l}>
                      {path ? (
                        <Link
                          to={path}
                          className="text-foreground/80 hover:text-primary transition-colors"
                        >
                          {l}
                        </Link>
                      ) : (
                        <a
                          className="text-foreground/80 hover:text-primary transition-colors"
                          href="#"
                        >
                          {l}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Lumen Capital. All rights reserved.</div>
          <div className="flex gap-5">
            {["Twitter", "LinkedIn", "GitHub", "Discord"].map((s) => (
              <a key={s} href="#" className="hover:text-primary">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
