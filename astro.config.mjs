// @ts-check
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "static",
  adapter: cloudflare(),
  i18n: {
    locales: ["it", "en"],
    defaultLocale: "it",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  redirects: {
    "/experience": "/#experience",
    "/projects": "/#projects",
    "/skills": "/#skills",
    "/contact": "/#contact",
    "/en/experience": "/en#experience",
    "/en/projects": "/en#projects",
    "/en/skills": "/en#skills",
    "/en/contact": "/en#contact",
    "/it": "/",
    "/it/blog": "/blog",
    "/it/blog/[...slug]": "/blog/[...slug]",
    "/it/experience": "/#experience",
    "/it/projects": "/#projects",
    "/it/skills": "/#skills",
    "/it/contact": "/#contact",
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: true,
    },
  },
});
