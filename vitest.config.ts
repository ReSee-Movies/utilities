import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/'),
    },
  },

  test: {
    disableConsoleIntercept: false,

    reporters: [
      ['default', { summary: false }],
    ],

    coverage: {
      provider : 'v8',
      reporter : ['html', ['lcov', { file: 'report.lcov' }]],
      exclude  : ['docs/**', ...coverageConfigDefaults.exclude],
    },

    projects: [
      {
        extends : true,
        test    : {
          name    : 'unit',
          include : ['tests/**/*.test.ts'],
          exclude : ['tests/**/*.dom.test.ts'],
        },
      },
      {
        extends : true,
        test    : {
          name    : 'dom',
          include : ['tests/**/*.dom.test.ts'],
          browser : {
            provider  : 'playwright',
            enabled   : true,
            headless  : true,
            instances : [
              { browser: 'chromium' },
            ],
          }
        },
      },
    ],
  },
});
