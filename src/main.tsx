import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import AppGate from "./pages/app";
import PrivacyPolicy from "./pages/privacy";
import TermsConditions from "./pages/terms";
import { AuthProvider } from "./lib/auth";
import { Toaster } from "@/components/ui/sonner";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/app" element={<AppGate />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" closeButton theme="dark" />
    </AuthProvider>
  </React.StrictMode>,
);
