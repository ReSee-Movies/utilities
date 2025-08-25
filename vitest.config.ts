import { defineConfig } from 'vitest/config';
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
    },
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, './src/'),
    },
  },
});
