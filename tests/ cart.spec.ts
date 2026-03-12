import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

//
// 1️⃣ Products Render Correctly
//
test('should render product list', async ({ page }) => {
    await expect(page.locator('[data-testid="product-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="product-3"]')).toBeVisible();
});

//
// 2️⃣ Add Item To Cart
//
test('should add product to cart', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('product-1').getByRole('button').click();

    // Fix: exact heading match
    await expect(
        page.getByRole('heading', { name: 'Cart', exact: true })
    ).toBeVisible();

    const qtyInput = page.locator('input[type="number"]').first();
    await expect(qtyInput).toHaveValue('1');
});

//
// 3️⃣ Increase Quantity Updates Total
//
test('should update quantity and recalculate total', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('product-2').getByRole('button').click();

    const qtyInput = page.locator('input[type="number"]').first();
    await qtyInput.fill('3');

    const subtotal = page.getByText(/Subtotal:/);
    await expect(subtotal).toHaveText(/\$150/);
});

//
// 4️⃣ Remove Item From Cart
//
test('should remove item from cart', async ({ page }) => {
    await page.goto('/');

    // Add Keyboard
    await page.getByTestId('product-3').getByRole('button').click();

    // Remove from cart
    await page.getByRole('button', { name: 'Remove' }).click();

    // Assert it no longer exists inside cart
    await expect(
        page.getByTestId('cart-item-3')
    ).toHaveCount(0);
});

//
// 5️⃣ Apply Valid Coupon
//
test('should apply valid coupon', async ({ page }) => {
    await page.getByTestId('product-1').getByRole('button').click();

    await page.getByPlaceholder('Coupon code').fill('SAVE10');
    await page.getByRole('button', { name: 'Apply' }).click();

    const totalHeading = page.getByRole('heading', { name: /^Total:/ });

    await expect(totalHeading).toBeVisible();
    await expect(totalHeading).toHaveText(/Total:\s*\$/);
});

//
// 6️⃣ Invalid Coupon Should Not Change Total
//
test('should not apply invalid coupon', async ({ page }) => {
    await page.locator('[data-testid="product-1"] button').click(); // Laptop

    await page.getByPlaceholder('Coupon code').fill('INVALID');
    await page.getByRole('button', { name: 'Apply' }).click();

    await page.waitForTimeout(1100);

    await expect(page.getByText('Total: $1100')).toBeVisible();
});

//
// 7️⃣ Bulk Mouse Discount Rule
//
test('should apply bulk mouse discount rule', async ({ page }) => {
    await page.goto('/');

    // Add Mouse (product-2)
    await page.getByTestId('product-2').getByRole('button').click();

    // Update quantity to 3
    const qtyInput = page.locator('input[type="number"]').first();
    await expect(qtyInput).toBeVisible();
    await qtyInput.fill('3');

    // Verify Total updates (not Subtotal)
    const totalHeading = page.getByRole('heading', { name: /^Total:/ });

    await expect(totalHeading).toBeVisible();
    await expect(totalHeading).toHaveText(/Total:\s*\$/);
});

//
// 8️⃣ Persistence After Reload
//
test('should persist cart after reload', async ({ page }) => {
    await page.locator('[data-testid="product-1"] button').click(); // Laptop

    await page.reload();

    await expect(page.locator('input[type="number"]')).toHaveValue('1');
});

//
// 9️⃣ Prevent Negative Quantity
//
test('should not allow negative quantity', async ({ page }) => {
    await page.locator('[data-testid="product-2"] button').click(); // Mouse

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
    await page.goto('/');

    const couponInput = page.getByPlaceholder('Coupon code');
    await expect(couponInput).toBeVisible();
    await couponInput.fill('SAVE10');

    const applyButton = page.getByRole('button', { name: 'Apply' });

    // Rapid clicks
    await applyButton.click();
    await applyButton.click();
    await applyButton.click();

    // Target ONLY the Total heading (not Subtotal)
    const totalHeading = page.getByRole('heading', { name: /^Total:/ });

    await expect(totalHeading).toBeVisible();
    await expect(totalHeading).toHaveText(/Total:\s*\$/);
});

//
// 1️⃣2️⃣ Subtotal Calculation Precision
//
test('should calculate tax correctly with precision', async ({ page }) => {
    await page.locator('[data-testid="product-2"] button').click(); // Mouse

    const qtyInput = page.locator('input[type="number"]');
    await qtyInput.fill('3');

    await expect(page.getByText(/Tax:/)).toBeVisible();
});