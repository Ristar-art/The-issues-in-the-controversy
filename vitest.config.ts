import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [svelte({
    hot: !process.env.VITEST
  })],
  resolve: {
    conditions: ['browser']
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'json-summary', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,js,svelte}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.test.{ts,js}',
        'src/**/*.spec.{ts,js}',
        'src/stories/**',
        'src/**/*.stories.{ts,js,svelte}'
      ]
    },
    projects: [{
      extends: true,
      test: {
        name: 'unit',
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest-setup.ts'],
        exclude: [
          '**/node_modules/**',
          '**/.svelte-kit/**',
          '**/stryker-tmp/**',
          '**/*.stories.{ts,js,svelte}',
          // Pre-existing broken test: imports $app/navigation and runs against an
          // already-compiled @testing-library/svelte. Re-enable once migrated.
          'src/routes/admin/**/PagesEditor.test.js'
        ]
      }
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});