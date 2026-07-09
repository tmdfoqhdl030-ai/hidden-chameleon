import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  appName: "hidden-chameleon",
  brand: {
    displayName: "숨은 카멜레온",
    primaryColor: "#2f80ed",
    icon: "public/app-logo-600.png"
  },
  web: {
    host: "localhost",
    port: 5174,
    commands: {
      dev: "npm run dev",
      build: "npm run build"
    }
  },
  permissions: [],
  outdir: "dist"
});
