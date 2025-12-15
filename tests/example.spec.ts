import { test, expect } from '@playwright/test';

test('Vite + React counter increments correctly', async ({ page }) => {
  // 1️⃣ Open app
  await page.goto('http://localhost:5173/');

  // 2️⃣ Verify page title
  await expect(page).toHaveTitle('vite-d');

  // 3️⃣ Verify heading is visible
  const heading = page.getByRole('heading', { name: 'Vite + React' });
  await expect(heading).toBeVisible();

  // 4️⃣ Locate counter button
  const counterButton = page.getByRole('button', { name: /count is/i });

  // Initial value should be 0
  await expect(counterButton).toHaveText('count is 0');

  // 5️⃣ Single click → count = 1
  await counterButton.click();
  await expect(counterButton).toHaveText('count is 1');

  // 6️⃣ Double click → count +2 → total = 3
  await counterButton.dblclick();
  await expect(counterButton).toHaveText('count is 3');
});
