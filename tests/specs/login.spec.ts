import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

// Simple smoke test using LoginPage POM

test('login and verify inventory (POM)', async ({ page }) => {
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
  await login.login();

  // Wait for inventory-like elements to appear
  await page.waitForSelector('.inventory_list, .inventory_container, text=Products', { timeout: 10000 }).catch(() => {});
  await expect(page.locator('text=Products')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('text=Sauce Labs Backpack')).toBeVisible({ timeout: 10000 });

  const unauthorized = consoleErrors.filter(e => e.includes('401') || e.toLowerCase().includes('unauthorized'));
  expect(unauthorized.length, `Found console errors indicating 401/Unauthorized: ${unauthorized.join('; ')}` ).toBe(0);
});
