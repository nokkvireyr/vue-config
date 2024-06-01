// @ts-ignore
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
// @ts-ignore
import pluginVue from 'eslint-plugin-vue';
// @ts-ignore
import eslintConfigPrettier from 'eslint-config-prettier';

export type OptionRules = 'off' | 'warn' | 'error' | 'never';
export type Rules = Record<
  string,
  Omit<OptionRules, 'never'> | (OptionRules | Record<string, unknown>)[]
>;

export const esLintConfig = ({
  tsconfigs = ['./tsconfig.json'] as string[],
  globals = {} as Record<string, 'readonly' | 'writable'>,
  rules = {} as Rules,
}) =>
  tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    {
      // @ts-ignore
      plugins: {
        'typescript-eslint': tseslint.plugin,
      },
      languageOptions: {
        parserOptions: {
          parser: tseslint.parser,
          project: tsconfigs,
          extraFileExtensions: ['.vue'],
          sourceType: 'module',
        },
      },
    },
    eslintConfigPrettier,
    {
      languageOptions: {
        globals: globals,
      },
      rules: {
        'no-console': 'warn',
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
        'vue/multi-word-component-names': 'off',
        'prefer-const': 'error',
        'vue/camelcase': 'error',
        camelcase: 'error',
        'vue/attribute-hyphenation': ['error', 'never'],
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/v-on-event-hyphenation': ['error', 'never', { autofix: true }],
        '@typescript-eslint/ban-ts-comment': 'off',
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
        ...rules,
      },
    }
  );
