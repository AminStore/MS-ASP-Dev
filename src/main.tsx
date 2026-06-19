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
  // 1. Suppress runtime.lastError (extension system errors)
  const extensionErrorPatterns = [
    "Receiving end does not exist",
    "Could not establish connection",
    "message port closed",
    "useCache"
  ];

  const isExtensionError = (str: string): boolean => {
    const msg = String(str).toLowerCase();
    return extensionErrorPatterns.some(pattern => msg.includes(pattern.toLowerCase()));
  };

  // Override chrome.runtime.lastError handling more aggressively
  if (typeof (window as any).chrome !== "undefined" && (window as any).chrome?.runtime) {
    try {
      Object.defineProperty((window as any).chrome.runtime, "lastError", {
        get() {
          return null;
        },
        set() {
          // Do nothing - suppress setting lastError
        },
        configurable: true,
      });
    } catch (e) {
      // If we can't override, suppress the error
    }
  }

  // Intercept uncaught errors that extensions throw
  const originalAddEventListener = window.addEventListener;
  window.addEventListener = function(type: string, ...args: any[]) {
    if (type === "error" || type === "unhandledrejection") {
      const [listener, options] = args;
      const wrappedListener = function(event: any) {
        const message = event.message || event.reason?.message || String(event);
        if (isExtensionError(message)) {
          event.preventDefault?.();
          return;
        }
        return listener.call(this, event);
      };
      return originalAddEventListener.call(this, type, wrappedListener, options);
    }
    return originalAddEventListener.call(this, type, ...args);
  };

  // 2. Suppress unhandledrejection events
  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const message = reason?.message || String(reason);
    
    if (isExtensionError(message)) {
      event.preventDefault();
    }
  });

  // 3. Suppress error events from extensions (capture phase)
  window.addEventListener("error", (event) => {
    const message = event.message || String(event);
    
    if (isExtensionError(message)) {
      event.preventDefault();
      return true;
    }
  }, true);

  // 4. Intercept console methods to suppress extension errors
  const originalError = console.error;
  const originalWarn = console.warn;
  
  console.error = function(...args: any[]) {
    const message = args.map(arg => String(arg)).join(" ");
    if (!isExtensionError(message)) {
      originalError.apply(console, args);
    }
  };

  console.warn = function(...args: any[]) {
    const message = args.map(arg => String(arg)).join(" ");
    const hasThreeClockWarning = message.includes("THREE.Clock") || 
                                 message.includes("THREE.Timer") ||
                                 message.includes("deprecated");
    if (!isExtensionError(message) && !hasThreeClockWarning) {
      originalWarn.apply(console, args);
    }
  };

  // 5. Suppress extension-related console logs (non-errors)
  const originalLog = console.log;
  console.log = function(...args: any[]) {
    const message = args.map(arg => String(arg)).join(" ");
    
    // Skip extension framework logs
    const extensionLogs = [
      "[ExtensionPerf]",
      "[ChromePolyfill]",
      "Content Script",
      "Initializing",
      "JSHeapSnapshot",
      "Content loaded",
      "Unchecked runtime.lastError"
    ];
    
    const isExtensionLog = extensionLogs.some(pattern => message.includes(pattern));
    if (!isExtensionLog) {
      originalLog.apply(console, args);
    }
  };

  // 6. Suppress THREE.Clock deprecation warning from react-three-fiber
  const originalInfo = console.info;
  console.info = function(...args: any[]) {
    const message = args.map(arg => String(arg)).join(" ");
    if (!message.includes("THREE.Clock") && !message.includes("THREE.Timer")) {
      originalInfo.apply(console, args);
    }
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
