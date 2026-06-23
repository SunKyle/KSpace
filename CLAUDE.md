# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (velite content watch + next dev in parallel)
npm run build    # Production build (velite content compile, then next build)
npm run start    # Start production server
npm run lint     # ESLint flat config (next/core-web-vitals + next/typescript)
```

No test framework is configured in this project.

## Architecture

### Content layer (Velite)

Content lives in `src/content/` as MDX files (blog posts under `blog/`, projects under `projects/`). Velite compiles them into `.velite/` as typed JSON (`posts.json`, `projects.json`). The re-export at `src/lib/velite.ts` is the single import point for all content consumers. Velite schemas are defined in `velite.config.ts`.

**When editing content**: run `npx velite` to recompile, or rely on `npm run dev` which runs `velite dev` (watch mode) alongside `next dev`.

### Theme system

Dark mode uses Tailwind's `class` strategy. CSS custom properties in `src/styles/globals.css` store colors as bare RGB triples (e.g., `--color-bg-primary: 9 9 11`), composed as `rgb(var(--color-bg-primary))` so Tailwind can apply alpha with Tailwind's opacity modifiers. Theme toggle is a client-side component that persists to `localStorage`; an inline script in the root layout prevents FOUC.

### AI Lab

Client-side React components in `src/components/lab/` stream responses from `POST /api/ai/chat` (defined in `src/app/api/ai/chat/route.ts`). The endpoint uses the Vercel AI SDK (`ai` + `@ai-sdk/openai`). Client-side streaming is handled by `src/lib/ai-client.ts`. Three model tiers are configured in `src/lib/ai.ts`: fast (`gpt-4o-mini`), capable (`gpt-4o`), reasoning (`o3-mini`). Requires `OPENAI_API_KEY` in `.env.local` (see `.env.local.example`).

### 3D / Three.js

`next.config.ts` adds a webpack rule for `.glb`/`.gltf` files (asset/resource) and transpiles `three`. Three.js components use `@react-three/fiber` + `@react-three/drei`. 3D card assets are in `public/assets/lanyard/` with a generation script at `scripts/generate-assets.mjs`.

### Paths and conventions

- `@/*` maps to `src/*` (configured in `tsconfig.json`)
- UI language is Chinese (Simplified), code identifiers are English
- Component files use PascalCase, utilities use camelCase
- `src/lib/utils.ts` provides `cn()` (classname joiner), `formatDate()` (zh-CN locale), and `readingTime()` (counts both Chinese chars and English words at 300 wpm)
- `src/hooks/` contains shared hooks (`use-screen-size`), `src/components/hooks/` contains component-specific hooks (`use-debounced-dimensions`)
