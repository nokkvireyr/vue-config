# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
pnpm install

# Build (TypeScript declarations + Vite bundle)
pnpm build

# Lint source files
pnpm lint
```

> Note: There are no tests. The project is a configuration utility library.

## Architecture

This is `@nokkvireyr/vue-config`, a reusable npm library that exports opinionated ESLint, oxlint, and Prettier configuration presets for Vue.js projects. All peer dependencies are optional — consuming projects install only what they use.

**Entry point:** `src/main.ts` — re-exports three modules:
- `eslintConfig()` from `src/lint/lint.ts` — ESLint flat config factory (`globals`, `rules`, `ignores`, `oxlintPlugin` options)
- `oxlintConfig()` from `src/oxlint/oxlint.ts` — oxlint config factory returning a plain object (`.oxlintrc.json` format)
- `oxfmtConfig()` from `src/oxfmt/oxfmt.ts` — OXC formatter config factory returning a plain object (`.oxfmtrc.json` format); has built-in Tailwind sorting via `sortTailwindcss`, no plugins needed
- `prettierConfig` from `src/prettier/prettier.ts` — static Prettier config object (includes `prettier-plugin-tailwindcss`)

**ESLint + oxlint hybrid:** Pass the imported `eslint-plugin-oxlint` module as `oxlintPlugin` to `eslintConfig()` to automatically append `flat/recommended` (disables ESLint rules already covered by oxlint):
```js
import oxlint from 'eslint-plugin-oxlint';
import { eslintConfig } from '@nokkvireyr/vue-config';
export default eslintConfig({ oxlintPlugin: oxlint });
```

**oxlint standalone:** Use `oxlintConfig()` to generate the config object and write it to `.oxlintrc.json`, or use `oxlint`'s `defineConfig` with `extends` pointing to a file that re-exports it.

**Build:** Vite 8 (rolldown) in library mode. `vite.config.ts` uses `build.rolldownOptions` for externalization. A separate `tsconfig.decleration.json` generates type declarations into `dist/types/`. All peer dependencies are externalized.

**Self-referential configs:** `eslint.config.js` and `prettier.config.js` import from `dist/main.js` — run `pnpm build` before linting will work.

## Release Strategy

- **Production releases** → npm registry: triggered on push to `main` when `package.json` version does NOT contain `-dev`
- **Dev pre-releases** → GitHub Packages: triggered on non-main branches when version contains `-dev`

To cut a release, update the version in `package.json` accordingly and push to the appropriate branch.
