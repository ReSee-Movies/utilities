import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores(['./coverage/**/*', './dist/**/*', './docs/**/*']),
  {
    extends: [
    eslint.configs.recommended,
    tslint.configs.recommended,
    tslint.configs.stylisticTypeChecked,
    ],

    files: ['./src/**/*', './tests/**/*'],

    rules: {
      '@typescript-eslint/consistent-type-definitions' : 'off',
      '@typescript-eslint/prefer-nullish-coalescing'   : 'off',
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService  : true,
        tsconfigRootDir : import.meta.dirname,
      },
    },
  },
);
