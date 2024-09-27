// vite.config.ts
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteReact(),
    TanStackRouterVite(),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
