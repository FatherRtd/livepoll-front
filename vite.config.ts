import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const HOST = "0.0.0.0";
const api = "https://localhost:8000";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: HOST,
    port: 4200,
    proxy: {
      "^/api": {
        target: api,
        ws: false,
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
