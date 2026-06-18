import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindPlugin from "@tailwindcss/vite";

// Security headers applied in dev — mirrors public/_headers for production
const SECURITY_HEADERS = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "0",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
};

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindPlugin(),
    {
      name: "externalize-node-modules",
      resolveId(id) {
        if (id.startsWith("node:")) return { id, external: true };
      },
    },
  ],

  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    // Security headers are intentionally NOT set here — they break the Vite
    // HMR WebSocket upgrade in Replit's proxied environment. Headers are
    // enforced at the CDN/hosting layer via public/_headers in production.
  },

  preview: {
    host: "0.0.0.0",
    port: 5000,
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    // Target modern browsers — smaller output, no legacy polyfills needed
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
    // Three.js (730 kB) and the vendor bundle are inherently large; suppress noise
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      input: "index.html",
      external: [
        "node:async_hooks",
        "node:stream",
        "node:util",
        "node:events",
        "node:path",
        "node:fs",
      ],
      output: {
        paths: { "node:*": "[name]" },
        // Separate Three.js and Framer Motion into their own long-lived cache
        // chunks. Everything else stays in one vendor bundle to avoid
        // circular-dependency chunk warnings.
        manualChunks(id) {
          if (id.includes("node_modules/three")) return "vendor-three";
          if (id.includes("node_modules/framer-motion")) return "vendor-framer";
          if (id.includes("node_modules/")) return "vendor";
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  resolve: {
    alias: { "@": "/src" },
    // Force all packages (incl. @react-three/fiber) to share the same React
    // instance. Without this, Vite may bundle two copies of React, causing
    // "Invalid hook call" errors at runtime.
    dedupe: ["react", "react-dom", "react-dom/client"],
  },

  optimizeDeps: {
    // resolve.dedupe above handles the single-React guarantee for
    // @react-three/fiber. Avoid forcing pre-bundle of react/react-dom
    // explicitly — it triggers hash churn and 504s during dev restarts.
    exclude: ["@tanstack/start-storage-context"],
    esbuildOptions: {
      define: { global: "globalThis" },
    },
  },
});
