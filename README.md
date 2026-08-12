# paolocattani.me

Personal profile site built with Astro, Tailwind CSS, and Cloudflare.

## Commands

| Command        | Action                                      |
| :------------- | :------------------------------------------ |
| `pnpm install` | Installs dependencies                       |
| `pnpm dev`     | Starts local dev server at `localhost:4321` |
| `pnpm build`   | Build for production to `./dist/`           |
| `pnpm preview` | Preview build with Wrangler (Cloudflare)    |
| `pnpm deploy`  | Deploy Worker via Wrangler                  |

## CI / deploy (GitHub Actions)

Workflow [`.github/workflows/ci-deploy.yml`](.github/workflows/ci-deploy.yml): build on every PR and push; deploy the Worker on push to `main` only.

Configure in the GitHub repo:

| Kind | Name | Notes |
| :--- | :--- | :--- |
| Secret | `CLOUDFLARE_API_TOKEN` | Token with Workers deploy + R2 read (same pattern as journal) |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |
| Variable (optional) | `PUBLIC_FORMSPREE_ENDPOINT` | Contact form endpoint baked in at build time |

Also create a GitHub Environment named `production` (deploy job uses it), and ensure the R2 bucket `paolocattani-blog` exists.

Wrangler needs `main = "./dist/_worker.js/index.js"` plus `public/.assetsignore` (`_worker.js`, `_routes.json`) so the Worker entry is not uploaded as a static asset. CI uploads the `dist` artifact with `include-hidden-files: true` so `.assetsignore` survives.

## Blog (R2)

Blog posts are stored in **Cloudflare R2** and fetched at runtime—no rebuild when adding posts.

### Setup

1. Create an R2 bucket named `paolocattani-blog` in Cloudflare Dashboard
2. Update `bucket_name` in `wrangler.toml` if you use a different name

### Adding a post

Upload a Markdown file to the `posts/` prefix in your R2 bucket:

```markdown
---
title: "Your Post Title"
date: 2025-02-02
description: "A short summary for the blog index"
---

Your content in **Markdown**...
```

### Upload methods

- **Dashboard:** R2 → bucket → Upload → create folder `posts/` → upload `.md` file
- **Wrangler:** `wrangler r2 object put paolocattani-blog/posts/my-post.md --file=./my-post.md`
