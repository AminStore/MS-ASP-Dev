import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { initializeExtensionErrorSuppression } from "./lib/extensions";
import { initializeTheme, initializeLocale } from "./lib/preferences";
import { registerServiceWorker } from "./lib/service-worker";
import { createQueryClient, getRouter } from "./router";

import "./styles.css";

// ── Initialize critical startup concerns ──────────────────────
// These must run early and in order to prevent visual flicker and suppress noise

// 1. Suppress extension errors early, before other code runs
if (typeof window !== "undefined") {
  initializeExtensionErrorSuppression();
}

// 2. Apply theme before first paint to prevent flash
initializeTheme();

// 3. Apply locale/direction before first paint
initializeLocale();

// ── Setup router and mount app ────────────────────────────────
const queryClient = createQueryClient();
const router = getRouter(queryClient);

// TypeScript registration for router
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

// ── Register Service Worker for PWA ──────────────────────────
registerServiceWorker();
