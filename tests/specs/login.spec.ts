import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';

// Simple smoke test using LoginPage POM

test('login and verify inventory (POM)', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login();

  await expect(page).toHaveURL(/inventory\.html/);

  const inventory = new InventoryPage(page);
  await expect(inventory.productList).toBeVisible({ timeout: 10000 });
  await expect(page.locator('.title')).toContainText('Products');
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible({ timeout: 10000 });
});
