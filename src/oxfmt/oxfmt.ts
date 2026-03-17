import { OxfmtConfig } from 'oxfmt';

/**
 * Returns an oxfmt config object to spread into `defineConfig()` in your `oxfmt.config.ts`.
 *
 * @example
 * // oxfmt.config.ts
 * import { defineConfig } from 'oxfmt';
 * import { oxfmtConfig } from '@nokkvireyr/vue-config';
 * export default defineConfig(oxfmtConfig());
 */
export const oxfmtConfig = (overrides: OxfmtConfig = {}): OxfmtConfig => ({
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'es5',
  sortTailwindcss: {},
  ...overrides,
});
