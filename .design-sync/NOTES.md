# design-sync notes — Taqeemak website

## Setup (this repo is a Next.js app, not a published package)
- There is no `dist/`. `.design-sync/pkg/` is a thin wrapper package (`@taqeemak/ui`) whose `index.ts` re-exports the presentational subset of `components/`. The converter bundles it via `cfg.entry`.
- Run `cfg.buildCmd` (`node .design-sync/pkg/build.mjs`) from the repo root before every converter/driver run. It (1) runs the repo's `tsc` to emit `.d.ts` into `.design-sync/pkg/types/` and rewrites `@/` aliases to relative paths, and (2) compiles `app/globals.css` with Tailwind v4 (`.ds-sync/node_modules/.bin/tailwindcss`, installed as `npm i @tailwindcss/cli@4.3.3` in `.ds-sync/`) into `.design-sync/pkg/dist/taqeemak.css`.
- Tailwind auto-scans the whole repo, plus `@source "../previews"` and an `@source inline(...)` safelist in `pkg/styles.src.css`, so the design agent's own utilities resolve.
- `next/image` is shimmed to a plain `<img>` (`pkg/shims/next-image.tsx`) through `pkg/tsconfig.json` paths (used both by tsc and by esbuild via `cfg.tsconfig`).
- `TaqeemakProvider` (`pkg/layout/provider.tsx`) is design-sync-only. It composes the site's real `ThemeProvider` + `DictionaryProvider` (ar/en JSON) + `DirectionProvider` and sets `<html dir/lang>` like `app/[lang]/layout.tsx`. It sits under `layout/` only so its card group is "layout".
- The bundle also exports `toast` from `sonner`, so the agent can trigger the Toaster.
- Fonts: next/font serves Cairo + IBM Plex Mono at runtime. Self-hosted woff2 copies (Google Fonts, OFL; arabic/latin/latin-ext subsets) live in `pkg/fonts/` and ship via `cfg.extraFonts`. The converter keeps only `@font-face` from extraFonts, so `--font-cairo` / `--font-plex-mono` are defined in `pkg/styles.src.css`. Without them every font falls back to Times.
- Render check / capture use system Chrome: `DS_CHROMIUM_PATH=/usr/bin/google-chrome` (playwright installed into `.ds-sync/` with `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`).

## Scope decisions
- Included: all 23 `components/ui/*` files, plus CheckBadge, KioskRating, Logo, LogoChip, Reveal, PasswordInput, PhoneInput, StatusBadge, DataTable, HeroKiosk, AuthShell, DatePicker, ThemeToggle.
- Excluded because they are data-bound (react-query hooks, API services, the Next router or server-only i18n): auth/login/register forms, checkout view, payment result, shipping address, Moyasar form, contact and ticket forms, navbar, user menu, language switcher, footer (async server component), account/profile views, ProductsGrid, Partners and StatusPage (absolute `/images/*` URLs), FileDropzone (imports upload.service), form-field (needs a react-hook-form `control`).
- Compound subparts (`DialogContent`, `TableRow` and so on) are `componentSrcMap: null`, so they get no standalone card. They are still exported on `window.Taqeemak` and documented in the conventions header.
- Card groups: `components/ui/*` get groups from the category stubs in `.design-sync/docs/`. App components get their folder name (shared, forms, settings, checkout, home, auth, layout), because a doc category can't override a non-generic directory group.

## Preview authoring
- Copy is Arabic from `i18n/dictionaries/ar.json`; the provider default is `locale="ar"`.
- Dark examples use a scoped `className="dark"` wrapper. A nested `TaqeemakProvider theme="dark"` would flip `<html>` for every cell.
- Overlays are rendered open (`defaultOpen modal={false}`) with `cardMode: single`.

## Known render warns
- `[RENDER_THIN] Toaster`: sonner toasts are `position: fixed`, so measured height is 0. The screenshot is correct.
- Label/PhoneInput review sheets crop the first RTL glyph at the capture bounds. This is the capture only, not the component.

## Re-sync risks
- The `pkg/index.ts` export list and the `componentSrcMap` nulls must be updated by hand when components are added to or removed from `components/`.
- `pkg/fonts/*.woff2` are a Google Fonts snapshot (v31 Cairo, v20 Plex Mono). They won't track next/font updates.
- The Tailwind CLI version is pinned to the repo's `tailwindcss` (4.3.3). Bump both together.
- AuthShell's `auth` prop expects the full `Dictionary["auth"]` type, but the preview passes only `panelQ`/`panelD` (cast). A type tightening upstream will not break the bundle but may break the preview compile.
- The Calendar preview shows English month names (no date-fns locale is exported). DatePicker shows Arabic dates through its own `useI18n` locale.
