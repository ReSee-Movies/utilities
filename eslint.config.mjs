import eslint from '@eslint/js';
import tslint from 'typescript-eslint';

export default tslint.config(
  eslint.configs.recommended,
  tslint.configs.recommended,
  tslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['tests/**', '!**/*.ts'],
    extends: [tslint.configs.disableTypeChecked],
  },
);
