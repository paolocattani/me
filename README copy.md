# paolocattani.me

Personal profile site built with Astro, Tailwind CSS, and Cloudflare.

## Commands

| Command        | Action                                      |
| :------------- | :------------------------------------------ |
| `pnpm install` | Installs dependencies                       |
| `pnpm dev`     | Starts local dev server at `localhost:4321` |
| `pnpm build`   | Build for production to `./dist/`           |
| `pnpm preview` | Preview build with Wrangler (Cloudflare)    |

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
