import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  expect: {
    timeout: 5000,
  },
  timeout: 5000,
  reporter: [
    ['json', { outputFile: 'playwright-report/report.json' }]
  ],
  use: {
    trace: 'off',
    screenshot: 'off',
    video: 'off',
    headless: true
  },
  webServer: {
    command: 'npm run dev',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
