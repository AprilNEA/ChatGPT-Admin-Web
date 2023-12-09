import { resolve } from 'path';
import tsconfigPath from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: './test',
  test: {
    include: ['**/*.spec.ts', '**/*.e2e-spec.ts'],

    globals: true,
    setupFiles: [resolve(__dirname, './test/setup-file.ts')],
    environment: 'node',
    includeSource: [resolve(__dirname, './test')],
  },

  plugins: [
    tsconfigPath({
      projects: [
        resolve(__dirname, './test/tsconfig.json'),
        resolve(__dirname, './tsconfig.json'),
      ],
    }),
  ],
});
