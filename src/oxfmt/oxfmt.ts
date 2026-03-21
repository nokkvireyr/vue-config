import type { defineConfig } from 'oxfmt';
export type { OxfmtConfig } from 'oxfmt';

type OxfmtConfig = Parameters<typeof defineConfig>[0];
export const oxfmtConfig = (overrides: OxfmtConfig = {}): OxfmtConfig => ({
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'es5',
  sortTailwindcss: {},
  ...overrides,
});
