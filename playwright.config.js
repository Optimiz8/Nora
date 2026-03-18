import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:8080',
    headless: true,
  },
  webServer: {
    command: 'npx serve . -p 8080 --no-clipboard',
    url: 'http://localhost:8080',
    reuseExistingServer: false,
    timeout: 10000,
  },
  reporter: 'list',
});
