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
  window.addEventListener = function(this: Window, type: string, listener?: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void {
    if (type === "error" || type === "unhandledrejection") {
      const wrappedListener = function(this: any, event: any) {
        const message = event.message || event.reason?.message || String(event);
        if (isExtensionError(message)) {
          event.preventDefault?.();
          return;
        }
        if (typeof listener === "function") {
          return listener.call(this, event);
        } else if (listener && typeof listener === "object" && "handleEvent" in listener) {
          return listener.handleEvent(event);
        }
      };
      return originalAddEventListener.call(this, type, wrappedListener, options) as any;
    }
    if (typeof listener === "function" || (listener && typeof listener === "object")) {
      return originalAddEventListener.call(this, type, listener, options) as any;
    }
  } as any;

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
  
  console.error = function(this: any, ...args: any[]): void {
    const message = args.map(arg => String(arg)).join(" ");
    if (!isExtensionError(message)) {
      originalError.apply(console, args);
    }
  } as any;

  console.warn = function(this: any, ...args: any[]): void {
    const message = args.map(arg => String(arg)).join(" ");
    const hasThreeClockWarning = message.includes("THREE.Clock") || 
                                 message.includes("THREE.Timer") ||
                                 message.includes("deprecated");
    if (!isExtensionError(message) && !hasThreeClockWarning) {
      originalWarn.apply(console, args);
    }
  } as any;

  // 5. Suppress extension-related console logs (non-errors)
  const originalLog = console.log;
  console.log = function(this: any, ...args: any[]): void {
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
  } as any;

  // 6. Suppress THREE.Clock deprecation warning from react-three-fiber
  const originalInfo = console.info;
  console.info = function(this: any, ...args: any[]): void {
    const message = args.map(arg => String(arg)).join(" ");
    if (!message.includes("THREE.Clock") && !message.includes("THREE.Timer")) {
      originalInfo.apply(console, args);
    }
  } as any;
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
