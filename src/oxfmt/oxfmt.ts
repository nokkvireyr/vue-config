import type { OxfmtConfig } from 'oxfmt';
export type { OxfmtConfig } from 'oxfmt';

export const oxfmtConfig = (overrides: OxfmtConfig = {}): OxfmtConfig => ({
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'es5',
  sortTailwindcss: {},
  ...overrides,
});
