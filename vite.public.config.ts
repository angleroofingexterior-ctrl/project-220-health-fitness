import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "public-shell",
  base: "./",
  publicDir: "../public-github",
  plugins: [react()],
  build: {
    outDir: "../public-pages",
    emptyOutDir: true,
  },
});
