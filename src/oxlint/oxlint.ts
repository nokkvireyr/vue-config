import type { OxlintConfig } from 'oxlint';
export type { OxlintConfig } from 'oxlint';

type OxlintPlugins = OxlintConfig['plugins'];
type RuleCategories = OxlintConfig['categories'];
type OxlintRules = OxlintConfig['rules'];
type OxlintGlobals = OxlintConfig['globals'];

export const oxlintConfig = ({
  plugins = [] as OxlintPlugins,
  categories = {} as RuleCategories,
  rules = {} as OxlintRules,
  globals = {} as OxlintGlobals,
  ignorePatterns = [] as string[],
  overrides = [] as NonNullable<OxlintConfig['overrides']>,
} = {}): OxlintConfig => ({
  plugins: [
    'typescript',
    'vue',
    ...(plugins || []).filter((p) => p !== 'typescript' && p !== 'vue').filter(Boolean),
  ],
  categories: {
    correctness: 'warn',
    ...categories,
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'warn',
    'prefer-const': 'error',
    'typescript/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'typescript/no-explicit-any': 'off',
    'typescript/ban-ts-comment': 'off',
    'vue/multi-word-component-names': 'off',
    ...rules,
  },
  env: { browser: true },
  globals,
  ignorePatterns: ['dist/**', ...ignorePatterns],
  overrides,
});
