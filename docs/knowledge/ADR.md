# Architectural Decision Records

## ADR-0005 — Empty LinkedIn profile opens with why, not the flagship

### Context

Paolo has never published on LinkedIn. The first technical piece is a seven-stage documentation story. Opening with that, on a silent profile, skips the reason anyone should care that he writes at all. The reason he has is real: a colleague said the work is worth doing, and Paolo wants to help and to be corrected.

### Decision

Post 0 is the intro (why he writes). Post 1 is the documentation-drift flagship, the next day. The intro does not preview the seven stages, name Giova, or link the blog.

### Consequences

- `SERIES.md` has a LinkedIn first-posts row before the essay table.
- "Da domani" is true only if the intro ships the day before the flagship.

## ADR-0001 — docs/knowledge is the writing DNA

### Context

Giova keeps architectural memory in `docs/knowledge/` and operational claims in `docs/STATUS.md`. Public posts for this site will be rewritten by agents across chats. Style cannot live only in a skill or a transcript.

### Decision

Voice, channels, and series live in this folder. The `public-writing` skill reads them first and writes corrections back here when Paolo changes the style.

### Consequences

- One place to personalize over time.
- A skill change that contradicts `VOICE.md` is a bug.

## ADR-0002 — Fork existing writing skills, do not install a LinkedIn formula pack

### Context

Public skills exist (`linkedin-post-writer` packs with 16 hook formulas; `social-media-skills` LinkedIn writer; local `writing-shape`, `writing-beats`, `unslop`; Giova `documentation-writer`). Formula packs optimize for engagement multipliers. Paolo's flagship draft is a seven-stage product story with a fact-check list.

### Decision

The project skill borrows process, not formulas:

- Giova `documentation-writer`: outline, wait, then write.
- `writing-shape`: the pile is read-only; do not invent; ground a concept before leaning on it.
- `unslop`: cut AI tells.
- `social-media-skills` LinkedIn writer: native post, hook before "see more", no engagement bait.

Do not install sergebulaev/linkedin-skills or similar packs into this repo.

### Consequences

- First posts sound like the Notion drafts, not like LinkedIn theatre.
- We can still steal one mechanic later and encode it in `VOICE.md`.

## ADR-0003 — Italian first, LinkedIn native, blog canonical

### Context

The site is bilingual. The LinkedIn drafts and the home tagline are Italian. An empty blog URL under a LinkedIn post cuts reach.

### Decision

Write Italian first. Publish LinkedIn as native text with no link. The blog is the canonical long form. Substack is the same essay plus a short newsletter intro. English translations are a later pass, after a locale split exists in R2.

### Consequences

- Italian posts will also appear on `/en/blog` until `lang` is filtered.
- A LinkedIn comment the next day can carry the blog/Substack URL.

## ADR-0004 — Five essays from a seven-stage arc

### Context

The flagship idea has seven product stages. Seven blog posts would be thin. A sister draft ("Prima riordina i cassetti") overlaps stage 7.

### Decision

One LinkedIn flagship covering all seven stages. Five blog/Substack essays. The drawers post is essay 5 and LinkedIn #2, not the opener. Do not write "ne ho già scritto" until that piece is public.

### Consequences

- Series order lives in [SERIES.md](SERIES.md).
- The seven-slide carousel is a remix after essay 5, not new material.
