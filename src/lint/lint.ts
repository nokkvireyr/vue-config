import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { createRequire } from 'node:module';
import type { Linter } from 'eslint';

const require = createRequire(import.meta.url);

const optionalRequire = <T>(id: string): T | undefined => {
  try {
    return require(id) as T;
  } catch {
    return undefined;
  }
};

export type OptionRules = 'off' | 'warn' | 'error' | 'never';
export type Rules = Record<
  string,
  Omit<OptionRules, 'never'> | (OptionRules | Record<string, unknown>)[]
>;

/** Pass the imported `eslint-plugin-oxlint` module to disable rules already covered by oxlint. */
type OxlintPlugin = {
  configs: Record<string, Linter.Config>;
  buildFromOxlintConfigFile?: (path: string) => Linter.Config[];
  buildFromOxlintConfig?: (config: Record<string, unknown>) => Linter.Config[];
};

export const eslintConfig = ({
  globals = {} as Record<string, 'readonly' | 'writable'>,
  rules = {} as Rules,
  ignores = [] as string[],
  oxlintPlugin = undefined as OxlintPlugin | undefined,
  vue = false,
} = {}) => {
  const pluginVue = vue
    ? optionalRequire<{ configs: Record<string, Linter.Config[]> }>('eslint-plugin-vue')
    : undefined;
  const gb = optionalRequire<{ browser?: Record<string, 'readonly' | 'writable'> }>('globals');
  const eslintConfigPrettier = optionalRequire<Linter.Config>('eslint-config-prettier');
  const prettierConfig =
    eslintConfigPrettier && !vue
      ? {
          ...eslintConfigPrettier,
          rules: Object.fromEntries(
            Object.entries(eslintConfigPrettier.rules ?? {}).filter(
              ([ruleName]) => !ruleName.startsWith('vue/')
            )
          ),
        }
      : eslintConfigPrettier;
  const vueRules = pluginVue
    ? {
        'vue/multi-word-component-names': 'off',
        'vue/camelcase': 'error',
        'vue/attribute-hyphenation': ['error', 'never'],
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/v-on-event-hyphenation': ['error', 'never', { autofix: true }],
        'vue/html-self-closing': [
          'warn',
          {
            html: {
              void: 'always',
              normal: 'always',
            },
            svg: 'always',
            math: 'always',
          },
        ],
      }
    : {};

  return tseslint.config(
    // @ts-ignore
    { ignores: ['**/dist', ...ignores] },
    {
      extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        ...(pluginVue?.configs['flat/recommended'] ?? []),
      ],
      files: ['**/*.{ts,vue,js}'],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: { ...(gb?.browser ?? {}), ...globals },
        parserOptions: {
          parser: tseslint.parser,
        },
      },
      rules: {
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-debugger': 'warn',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn', // or "error"
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        'no-undef': 'off',
        'prefer-const': 'error',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        ...(vueRules as any),
        ...rules,
      },
    },
    ...(prettierConfig ? [prettierConfig] : []),
    ...(oxlintPlugin ? [oxlintPlugin.configs['flat/recommended']] : [])
  );
};
