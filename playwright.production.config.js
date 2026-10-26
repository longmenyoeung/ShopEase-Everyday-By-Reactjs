import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config.js';

// Exercise dist/ assets on a separate port, never an existing dev server.
export default defineConfig({
  ...baseConfig,
  use: { ...baseConfig.use, baseURL: 'http://127.0.0.1:4174' },
  webServer: {
    command: 'npm run preview -- --port 4174 --strictPort',
    url: 'http://127.0.0.1:4174',
    reuseExistingServer: false,
  },
});
