import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const isProduction = process.env.NODE_ENV === 'production';

const backendURL = isProduction 
  ? 'http://backend-email-serverice-env.eba-yzyimp2w.eu-west-2.elasticbeanstalk.com'
  : 'http://localhost:8080';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": backendURL,
    },
  },
  build: {
    outDir: "build",
  },
});
