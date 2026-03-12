import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  expect: {
    timeout: 10000,
  },
  timeout: 60000,
  reporter: [
    ['json', { outputFile: 'playwright-report/report.json' }]
  ],
  use: {
    baseURL: 'http://localhost:5173',
    video: 'off',
    trace: 'off',
    screenshot: 'off',
    headless: true
  },
  webServer: {
    command: 'npm run build && npm run preview',
    port: 5173,
    reuseExistingServer: !process.env.CI,
    timeout: 180000
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
