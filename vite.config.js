import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/rotation-rack/",   // change to your repo name
  plugins: [react()]
});
