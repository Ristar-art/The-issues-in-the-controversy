// Stryker-only vitest config: skips the Storybook browser project so mutation
// runs stay headless and fast.
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  resolve: {
    conditions: ['browser']
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest-setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,js}'],
    exclude: [
      '**/node_modules/**',
      '**/.svelte-kit/**',
      '**/*.stories.{ts,js,svelte}',
      'src/routes/admin/**/PagesEditor.test.js'
    ]
  }
});
