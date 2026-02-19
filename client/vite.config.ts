import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

// server: {
//   proxy: {
//     // پروکسی برای همه مسیرهای /api
//     "/api": {
//       target: "https://technoshop-backend-vmit.onrender.com",
//       changeOrigin: true,
//       secure: false,
//       rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
//       // مسیر: /api/auth/login → /api/v1/auth/login
//     },
//   },
// },
