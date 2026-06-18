import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import "./styles.css";

// ── Suppress extension messaging errors ────────────────────────
// Browser extensions (Redux DevTools, React DevTools, etc.) may try to
// communicate with content scripts that don't exist. Suppress these harmless errors.
if (typeof window !== "undefined") {
  // Suppress unhandledrejection events
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const message = reason?.message || String(reason);
    
    if (
      message.includes("Receiving end does not exist") ||
      message.includes("Could not establish connection")
    ) {
      event.preventDefault();
    }
  });

  // Also suppress via console.error override for extension errors that don't trigger unhandledrejection
  const originalError = console.error;
  console.error = function(...args: any[]) {
    const message = args.map(arg => String(arg)).join(" ");
    
    // Skip extension-related errors
    if (
      message.includes("Receiving end does not exist") ||
      message.includes("Could not establish connection") ||
      message.includes("useCache")
    ) {
      return;
    }
    
    // Call original for other errors
    originalError.apply(console, args);
  };
}

// ── Theme: apply before first paint to prevent flash ──────────
const initializeTheme = () => {
  try {
    const stored = localStorage.getItem("theme");
    const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    document.documentElement.classList.toggle("dark", isDark);
  } catch {
    // localStorage blocked (e.g. private mode + strict settings)
  }
};

// ── Locale: apply dir/lang before first paint ─────────────────
const initializeLocale = () => {
  try {
    const locale = localStorage.getItem("locale") || "en";
    document.documentElement.setAttribute("lang", locale);
    document.documentElement.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
  } catch {
    // localStorage blocked
  }
};

initializeTheme();
initializeLocale();

// ── Router ────────────────────────────────────────────────────
// queryClient is passed via router context — __root.tsx provides the QueryClientProvider.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
});

const router = createRouter({
  routeTree,
  context: { queryClient },
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ── Mount ─────────────────────────────────────────────────────
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

// ── Service Worker ────────────────────────────────────────────
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch((err) => console.warn("SW registration failed:", err));
  });
}
