import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

export interface User {
  email: string;
  name: string;
  token: string;
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    phone: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  openLogin: () => void;
  openSignup: () => void;
  modal: "login" | "signup" | null;
  closeModal: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_KEY = "nova_ledger_session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [modal, setModal] = useState<"login" | "signup" | null>(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as User;
        if (parsed.email && parsed.token) {
          setUser(parsed);
        }
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
  }, []);

  // Login (Email only, Vercel Blob based verification)
  async function login(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, action: "login" }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Login failed. Please try again." };
      }

      const session: User = {
        email: data.email,
        name: data.name || email.split("@")[0],
        token: data.token,
      };

      setUser(session);
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setModal(null);
      return { success: true };
    } catch (err) {
      const rawMsg = (err?.message || err?.toString() || "");
      if (rawMsg.toLowerCase().includes("already exist") || rawMsg.toLowerCase().includes("already exists")) {
        toast.error("Account already exists");
        if (typeof setError === 'function') setError("Account already exists");
        setLoading(false);
        return;
      }

      return { success: false, error: "Network error. Please check your connection." };
    }
  }

  // Signup (1st submit to CRM Core API, 2nd register to Vercel Blob)
  async function signup(
    name: string,
    email: string,
    phone: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // 1. Submit lead to CRM Core via proxy
      const crmRes = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      const crmData = await crmRes.json();

      // Even if the CRM request failed with a non-200, we proceed as the proxy catches errors
      // and returns success: true. Let's make sure we log if it was an ignored error.
      if (!crmRes.ok || !crmData.success) {
        console.warn("CRM registration failed or returned non-ok status:", crmData);
      }

      // 2. Perform authentication and account creation in Vercel Blob
      const authRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, action: "signup", name, phone }),
      });

      const authData = await authRes.json();

      if (!authRes.ok || !authData.success) {
        return {
          success: false,
          error: authData.error || "Account creation failed. Please try again.",
        };
      }

      const session: User = {
        email: authData.email,
        name: authData.name || name,
        token: authData.token,
      };

      setUser(session);
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setModal(null);
      return { success: true };
    } catch (err) {
      const rawMsg = (err?.message || err?.toString() || "");
      if (rawMsg.toLowerCase().includes("already exist") || rawMsg.toLowerCase().includes("already exists")) {
        toast.error("Account already exists");
        if (typeof setError === 'function') setError("Account already exists");
        setLoading(false);
        return;
      }

      return { success: false, error: "Network error during signup. Please try again." };
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
    toast.success("Signed out successfully.");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        openLogin: () => setModal("login"),
        openSignup: () => setModal("signup"),
        modal,
        closeModal: () => setModal(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
