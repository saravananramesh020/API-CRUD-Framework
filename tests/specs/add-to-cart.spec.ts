import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';

// Enterprise-style spec using POMs
// Scenario: login, add Sauce Labs Backpack to cart, open cart and verify exactly one product, remove it, verify empty

test('add backpack -> cart -> remove (enterprise POM)', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    try {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    } catch (e) {
      // ignore
    }
  });

  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  await login.goto();
  await login.login();

  // add to cart by data-test id for the backpack
  await inventory.addToCartByTestId('sauce-labs-backpack');

  // verify cart badge
  await expect(inventory.cartBadge()).toHaveText('1');

  // open cart and verify one product
  await inventory.openCart();
  await expect(cart.cartItems).toHaveCount(1);
  const names = await cart.getItemNames();
  expect(names).toEqual(['Sauce Labs Backpack']);

  // remove product
  await cart.removeByTestId('sauce-labs-backpack');

  // verify cart empty
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  await expect(cart.cartItems).toHaveCount(0);

  const unauthorized = consoleErrors.filter(e => e.includes('401') || /unauthoriz/i.test(e));
  expect(unauthorized.length, `Found console errors indicating 401/Unauthorized: ${unauthorized.join('; ')}` ).toBe(0);
});
