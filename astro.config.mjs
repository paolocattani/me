// @ts-check
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: cloudflare(),
  i18n: {
    locales: ["en", "it"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  redirects: {
    "/experience": "/#experience",
    "/projects": "/#projects",
    "/skills": "/#skills",
    "/contact": "/#contact",
    "/it/experience": "/it#experience",
    "/it/projects": "/it#projects",
    "/it/skills": "/it#skills",
    "/it/contact": "/it#contact",
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: true,
    },
  },
});
