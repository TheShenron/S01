import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [
    ['json', { outputFile: 'playwright-report/report.json' }]
  ],
  use: {
    trace: 'off',
    screenshot: 'off',
    video: 'off'
  },
  webServer: {
    command: 'npm run dev',
    port: 5173,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
