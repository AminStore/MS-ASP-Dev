/**
 * Service Worker Registration
 * Registers the service worker for PWA functionality
 */

export const registerServiceWorker = (): void => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.warn("SW registration failed:", err));
    });
  }
};
