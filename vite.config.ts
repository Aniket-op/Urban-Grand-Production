import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

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
    // Allow Vite to serve files from src/Factory
    fs: {
      allow: [".."],
    },
  },
  // Treat .MOV and large media as static assets
  assetsInclude: ["**/*.MOV", "**/*.mov"],
  plugins: [
    react(),
    // Dev plugin: serve src/Factory files under /factory/ URL path
    {
      name: "serve-factory-assets",
      configureServer(server) {
        server.middlewares.use("/factory", (req, res, next) => {
          const factoryDir = path.resolve(__dirname, "src/Factory");
          const filePath = path.join(factoryDir, req.url || "");
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader("Cache-Control", "public, max-age=3600");
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes: Record<string, string> = {
              ".jpg": "image/jpeg",
              ".jpeg": "image/jpeg",
              ".png": "image/png",
              ".mov": "video/quicktime",
              ".mp4": "video/mp4",
              ".webm": "video/webm",
            };
            if (mimeTypes[ext]) res.setHeader("Content-Type", mimeTypes[ext]);
            fs.createReadStream(filePath).pipe(res);
          } else {
            next();
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
