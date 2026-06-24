import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const FAQ = [
  {
    q: "Is Lumen regulated?",
    a: "Lumen Capital operates under licensed entities in EU, UK, and US, with SOC 2 Type II and ISO 27001 certifications.",
  },
  {
    q: "How are assets custodied?",
    a: "Assets are held in multi-sig cold storage with HSM-backed key management and segregated client accounts.",
  },
  {
    q: "What are the fees?",
    a: "A flat 0.25% management fee. No trading commissions on portfolio rebalances.",
  },
  {
    q: "Can I withdraw at any time?",
    a: "Yes. Withdrawals are processed within one business day, with self-custody options available.",
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
    if (!fullName.trim()) errs.name = "Full name is required";

    if (!email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Invalid email format";
    }

    if (!phone.trim()) {
      errs.phone = "Phone number is required";
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
        toast.success("Enquiry submitted successfully.");
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
              Let's talk <span className="text-gradient italic">strategy</span>
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Whether you're allocating $10k or $10M, our team is here to help you build a portfolio
              with purpose.
            </p>

            <div className="mt-10 space-y-3">
              {[
                ["hello@lumen.capital", "Email"],
                ["+1 (415) 555-0182", "Phone"],
                ["San Francisco · London · Singapore", "Offices"],
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
              <h3 className="font-display text-2xl">Frequently asked</h3>
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
                    <h3 className="font-display text-2xl">Enquiry Received</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                      Thank you! Your enquiry has been received successfully.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} className="space-y-4">
                    <h3 className="font-display text-2xl">Send a message</h3>

                    {/* Full Name */}
                    <div className="space-y-1">
                      <FloatingInput
                        label="Full name"
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
                        label="Email"
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
                        label="Phone number"
                        type="tel"
                        value={phone}
                        onChange={(val) => {
                          setPhone(val);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
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
                        Message (optional)
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
                          Sending...
                        </>
                      ) : (
                        "Send message →"
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
