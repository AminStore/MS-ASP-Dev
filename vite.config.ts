import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindPlugin from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindPlugin(),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: "index.html",
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    minify: "terser",
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
});
