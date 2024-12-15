import config_love from 'eslint-config-love'
import config_prettier from 'eslint-config-prettier'
import plugin_svelte from 'eslint-plugin-svelte'
import plugin_prettier_recommended from 'eslint-plugin-prettier/recommended'
import plugin_typescript from 'typescript-eslint'
import plugin_stylistic from '@stylistic/eslint-plugin-ts'
import globals from 'globals'

import * as svelteParser from 'svelte-eslint-parser'
import * as typescriptParser from '@typescript-eslint/parser'

export default [
  {
    ignores: ['.svelte-kit/*', 'build/*', 'config/*'],
  },

  config_love,
  config_prettier,

  ...plugin_typescript.configs.recommended,
  ...plugin_svelte.configs['flat/recommended'],

  {
    plugins: {
      '@stylistic/ts': plugin_stylistic,
    },

    files: ['**/*.svelte'],

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: svelteParser,
      parserOptions: {
        parser: typescriptParser,
        project: './path/to/your/tsconfig.json',
        extraFileExtensions: ['.svelte'],
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },

    rules: {
      eqeqeq: 'warn',
      'no-empty': 'warn',
      'prefer-const': 'warn',
      'comma-dangle': 'off',
      'quote-props': 'off',

      '@typescript-eslint/no-throw-literal': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',

      '@stylistic/ts/comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'never',
          exports: 'never',
          functions: 'never',
        },
      ],
      '@stylistic/ts/no-extra-parens': 'error',
      '@stylistic/ts/space-before-function-paren': 'off',
    },
  },

  plugin_prettier_recommended,
]
