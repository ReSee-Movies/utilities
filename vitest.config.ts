import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import { resolve } from 'node:path';


export default defineConfig({
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
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, './src/'),
    },
  },
});
