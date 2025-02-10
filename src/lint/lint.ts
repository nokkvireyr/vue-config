import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';

export type OptionRules = 'off' | 'warn' | 'error' | 'never';
export type Rules = Record<
  string,
  Omit<OptionRules, 'never'> | (OptionRules | Record<string, unknown>)[]
>;

export const eslintConfig = ({
  globals = {} as Record<string, 'readonly' | 'writable'>,
  rules = {} as Rules,
} = {}) =>
  tseslint.config(
    eslint.configs.recommended,
    {
      extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        ...pluginVue.configs['flat/recommended'],
      ],
      files: ['**/*.{ts,vue}'],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parserOptions: {
          parser: tseslint.parser,
        },
      },
      rules: {
        // your rules
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
        'vue/attribute-hyphenation': ['error', 'never'],
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/v-on-event-hyphenation': ['error', 'never', { autofix: true }],
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
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
