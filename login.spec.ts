import { test, expect } from '@playwright/test';

// Playwright test: navigate to Swag Labs, log in as `standard_user`, and verify inventory page
// - Opens https://www.saucedemo.com
// - Fills username: standard_user
// - Fills password: secret_sauce
// - Clicks Login
// - Waits for /inventory.html and verifies Products heading and a product link
// - Captures console errors and fails if any 401 unauthorized errors are observed
// - Emits an accessibility snapshot to the test output for debugging

test('login and verify inventory (standard_user)', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    try {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    } catch (e) {
      // ignore
    }
  });

  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');

  // Ensure the login form is visible
  await expect(page.getByLabel('Username')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();

  // Fill credentials
  await page.fill('input#user-name, input[name="user-name"], input[data-test="username"]', 'standard_user');
  await page.fill('input#password, input[name="password"], input[data-test="password"]', 'secret_sauce');

  // Click the login button (robust selector with role fallback)
  const loginButton = page.getByRole('button', { name: 'Login' });
  await expect(loginButton).toBeVisible();
  await loginButton.click();

  // Wait for inventory page to load
  await page.waitForURL('**/inventory.html', { timeout: 5000 });
  await expect(page).toHaveURL(/.*inventory.html/);

  // Verify key inventory UI elements
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sauce Labs Backpack' })).toBeVisible();

  // Capture and print a simple accessibility snapshot for debugging
  try {
    const acc = await page.accessibility.snapshot();
    console.log('Accessibility snapshot (root):', JSON.stringify(acc, null, 2));
  } catch (e) {
    console.warn('Accessibility snapshot not available:', e);
  }

  // Fail test if any console error contains a 401 Unauthorized (as observed earlier)
  const unauthorized = consoleErrors.filter(e => e.includes('401') || e.toLowerCase().includes('unauthorized'));
  expect(unauthorized.length, `Found console errors indicating 401/Unauthorized: ${unauthorized.join('; ')}` ).toBe(0);
});
