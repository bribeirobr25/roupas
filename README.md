# roupas (working name — replaces `[NOME_DO_PROJETO]`)

Public, shareable landing page where anyone pastes a clothing-product URL
(t-shirt, button shirt, sweatshirt, or hoodie). A serverless function reads the
page, extracts the fabric facts, scores them against a quality guide, and returns
an honest verdict: quality band, "does it wrinkle?", what was found, what's
missing, and a confidence level.

**Core principle: the app never invents data.** If GSM is not on the page, the
result says "not informed" — it does not guess. Honesty about gaps is the
product's credibility. See `CLAUDE.md` and `docs/` for the full spec.

## Stack

- **Next.js (App Router) + TypeScript** — single page + `/api/analyze` Route
  Handler (server-side proxy, solves CORS).
- **cheerio** — lightweight HTML extraction (no headless browser; free-tier
  friendly).
- **Tailwind CSS v4** + `next/font` for editorial typography.
- **vitest** — parser unit tests with real-page fixtures.
- **pnpm** — package manager.

Rationale and locked decisions: `docs/DECISIONS.md`.

## Development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # run parser/API tests
pnpm test:watch   # watch mode
pnpm build        # production build
pnpm lint         # eslint
```

## Project structure

```
app/                  UI (single page) + states
app/api/analyze/      serverless analysis endpoint
lib/extract/          fetch + cheerio HTML -> text
lib/parser/           normalize, classify, extract tokens, score, wrinkle, confidence
lib/knowledge/        typed quality guide + audited brands (from docs/KNOWLEDGE-BASE.md)
lib/i18n/             EN / PT-BR / DE / ES dictionaries + provider
docs/                 spec, parser rules, knowledge base, i18n, decisions
```

## Deploy

Deployed on **Vercel free tier**. Push to the connected repo or run `vercel`.
The analysis endpoint runs as a Node.js serverless function (needs cheerio + full
fetch control, so not Edge runtime).

## Reading blocked / JS-heavy shops

The direct server fetch is the fast path. When it is blocked (datacenter-IP
anti-bot) or thin (JS-heavy SPA), the app falls back to a free, keyless reader
proxy (`r.jina.ai`) that renders JS from its own IP and returns text. The parser
then reads only the product section so a neighbouring product's data can't leak
in. This makes shops like **Zara** readable. Set `JINA_API_KEY` (optional) for
higher rate limits.

Shops with Akamai/Shape-grade anti-bot (e.g. **Hollister**, some **H&M**) block
the proxy too — those stay honestly `unreadable`. Covering them needs a headless
browser or residential proxy (roadmap; out of free-tier scope).

## Honest limitations

Data that shops never publish (e.g. GSM at Zara/H&M) cannot be invented — the app
returns `partial` / `indeterminate` and says so. It never guesses. See
`docs/DECISIONS.md §2` and `CLAUDE.md §7` (roadmap).
