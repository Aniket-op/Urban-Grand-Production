import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      // Proxy Vercel Blob Storage requests to avoid CORS issues in local dev
      "/blob-media": {
        target: "https://gkgaca1ysprfujnr.public.blob.vercel-storage.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/blob-media/, ""),
        secure: true,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
