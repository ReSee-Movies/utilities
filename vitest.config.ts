import { playwright } from '@vitest/browser-playwright';
import { resolve } from 'node:path';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

// @ts-ignore - Update tsconfig to support separate src & test projects via references
import PointerEventCommands from './tests/vitest-plugins/pointer-event-command';


export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/'),
    },
  },

  plugins: [PointerEventCommands()],

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
          include : ['tests/modules/**/*.test.ts'],
          exclude : ['tests/modules/**/*.dom.test.ts'],
        },
      },
      {
        extends : true,
        test    : {
          name    : 'dom',
          include : ['tests/modules/**/*.dom.test.ts'],
          browser : {
            provider  : playwright(),
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
