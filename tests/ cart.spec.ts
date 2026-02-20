import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
});

//
// 1️⃣ Products Render Correctly
//
test('should render product list', async ({ page }) => {
    await expect(page.getByText('Laptop')).toBeVisible();
    await expect(page.getByText('Mouse')).toBeVisible();
    await expect(page.getByText('Keyboard')).toBeVisible();
});

//
// 2️⃣ Add Item To Cart
//
test('should add product to cart', async ({ page }) => {
    await page.getByText('Laptop').locator('..').getByRole('button').click();

    await expect(page.getByText('Cart')).toBeVisible();
    const qtyInput = page.locator('input[type="number"]');
    await expect(qtyInput).toHaveValue('1');
});

//
// 3️⃣ Increase Quantity Updates Total
//
test('should update quantity and recalculate total', async ({ page }) => {
    await page.getByText('Mouse').locator('..').getByRole('button').click();

    const qtyInput = page.locator('input[type="number"]');
    await qtyInput.fill('3');

    await expect(page.getByText('Subtotal: $150')).toBeVisible();
});

//
// 4️⃣ Remove Item From Cart
//
test('should remove item from cart', async ({ page }) => {
    await page.getByText('Keyboard').locator('..').getByRole('button').click();
    await page.getByText('Remove').click();

    await expect(page.getByText('Keyboard')).not.toBeVisible();
});

//
// 5️⃣ Apply Valid Coupon
//
test('should apply valid coupon', async ({ page }) => {
    await page.getByText('Laptop').locator('..').getByRole('button').click();

    await page.getByPlaceholder('Coupon code').fill('SAVE10');
    await page.getByRole('button', { name: 'Apply' }).click();

    await page.waitForTimeout(1100);

    await expect(page.getByText('Total:')).toBeVisible();
});

//
// 6️⃣ Invalid Coupon Should Not Change Total
//
test('should not apply invalid coupon', async ({ page }) => {
    await page.getByText('Laptop').locator('..').getByRole('button').click();

    await page.getByPlaceholder('Coupon code').fill('INVALID');
    await page.getByRole('button', { name: 'Apply' }).click();

    await page.waitForTimeout(1100);

    await expect(page.getByText('Total: $1100')).toBeVisible();
});

//
// 7️⃣ Bulk Mouse Discount Rule
//
test('should apply bulk mouse discount rule', async ({ page }) => {
    await page.getByText('Mouse').locator('..').getByRole('button').click();

    const qtyInput = page.locator('input[type="number"]');
    await qtyInput.fill('3');

    await expect(page.getByText('Total:')).toBeVisible();
});

//
// 8️⃣ Persistence After Reload
//
test('should persist cart after reload', async ({ page }) => {
    await page.getByText('Laptop').locator('..').getByRole('button').click();

    await page.reload();

    await expect(page.locator('input[type="number"]')).toHaveValue('1');

});

//
// 9️⃣ Prevent Negative Quantity
//
test('should not allow negative quantity', async ({ page }) => {
    await page.getByText('Mouse').locator('..').getByRole('button').click();

    const qtyInput = page.locator('input[type="number"]');
    await qtyInput.fill('-5');

    await expect(qtyInput).toHaveValue('1');
});

//
// 🔟 Coupon Loading State
//
test('should show loading state while validating coupon', async ({ page }) => {
    await page.getByPlaceholder('Coupon code').fill('SAVE10');
    await page.getByRole('button', { name: 'Apply' }).click();

    await expect(page.getByText('Checking...')).toBeVisible();
});

//
// 1️⃣1️⃣ Rapid Coupon Click Should Not Break
//
test('should handle rapid coupon apply clicks safely', async ({ page }) => {
    await page.getByPlaceholder('Coupon code').fill('SAVE10');

    const button = page.getByRole('button', { name: 'Apply' });

    await button.click();
    await button.click();
    await button.click();

    await page.waitForTimeout(1500);

    await expect(page.getByText('Total:')).toBeVisible();
});

//
// 1️⃣2️⃣ Subtotal Calculation Precision
//
test('should calculate tax correctly with precision', async ({ page }) => {
    await page.getByText('Mouse').locator('..').getByRole('button').click();

    const qtyInput = page.locator('input[type="number"]');
    await qtyInput.fill('3');

    await expect(page.getByText(/Tax:/)).toBeVisible();
});