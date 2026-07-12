import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { COUNTRY_PHONE_PATTERNS } from "@/lib/phoneCountries";
import { useHoverScroll } from "@/lib/useHoverScroll";

export function CountrySelect({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: hoverScrollRef, onMouseMove, onMouseLeave, onTouchStart } = useHoverScroll<HTMLDivElement>();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button 
        type="button" 
        onClick={() => setOpen(!open)}
        className="flex w-[100px] h-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-[14px] text-sm outline-none transition-all hover:bg-white/[0.07] focus:border-primary/60 focus:bg-white/[0.07] cursor-pointer"
      >
        <span>{COUNTRY_PHONE_PATTERNS[value]?.flag || "🇨🇭"} {COUNTRY_PHONE_PATTERNS[value]?.dial || "+41"}</span>
        <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div 
          className="absolute left-0 top-full mt-2 w-[150px] bg-[#121212] border border-white/10 rounded-xl shadow-xl z-[9999] overflow-hidden"
        >
          <div 
            className="flex flex-col max-h-[250px] overflow-y-auto overscroll-contain"
            style={{ touchAction: "pan-y" }}
            ref={hoverScrollRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
          >
            {Object.entries(COUNTRY_PHONE_PATTERNS).map(([code, { flag, dial }]) => (
              <button
                key={code}
                type="button"
                className={`flex items-center px-4 py-2.5 text-sm text-left hover:bg-white/10 transition-colors ${code === value ? "bg-white/10 text-primary" : "text-foreground"}`}
                onClick={() => { onChange(code); setOpen(false); }}
              >
                <span className="mr-2">{flag}</span> <span>{dial}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
