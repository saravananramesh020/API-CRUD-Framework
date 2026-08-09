import { test, expect } from '@playwright/test';
import { LoginPage } from './tests/login.page';

// Refactored Playwright test using Page Object Model for login
// Flow:
// 1. Navigate to site and log in via LoginPage
// 2. Add Sauce Labs Backpack to cart
// 3. Open cart and assert there is exactly one product (the backpack)
// 4. Remove the product from the cart and assert the cart is empty
// 5. Fail on any console 401/Unauthorized errors

test.describe('Sauce Demo - cart flows (POM)', () => {
  test('add backpack, verify cart has one item, remove it and verify empty', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      try {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      } catch (e) {
        // ignore
      }
    });

    const login = new LoginPage(page);
    await login.goto();

    // Use the POM to perform login
    await login.login();

    // Add the product to the cart (use stable data-test selector)
    const addBackpack = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(addBackpack).toBeVisible();
    await addBackpack.click();

    // Verify the cart badge shows 1
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');

    // Open the cart and verify there's exactly one product
    await page.click('.shopping_cart_link');
    await page.waitForURL('**/cart.html');

    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(1);
    await expect(cartItems.first().locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');

    // Remove the product from the cart
    const removeButton = page.locator('button[data-test="remove-sauce-labs-backpack"]');
    await expect(removeButton).toBeVisible();
    await removeButton.click();

    // After removal: verify the cart is empty (no cart badge and no cart_item)
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    await expect(page.locator('.cart_item')).toHaveCount(0);

    // Fail test if any console error contains 401 or Unauthorized
    const unauthorized = consoleErrors.filter(e => e.includes('401') || /unauthoriz/i.test(e));
    expect(unauthorized.length, `Found console errors indicating 401/Unauthorized: ${unauthorized.join('; ')}` ).toBe(0);
  });
});
