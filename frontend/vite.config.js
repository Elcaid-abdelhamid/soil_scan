import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// En dev, le frontend tourne sur :5173 et le backend sur :5000.
// Le proxy ci-dessous permet d'appeler simplement fetch("/api/...")
// depuis le frontend sans se soucier de CORS ni de l'URL du backend.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
