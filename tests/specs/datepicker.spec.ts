import { test, expect } from '@playwright/test';
import { PracticePage } from '../pages/practice.page';

test.describe('Practice page - Date Picker', () => {
  test('select date and verify echoed value', async ({ page }) => {
    const practice = new PracticePage(page);
    await practice.goto();

    const date = '2025-12-25';
    await practice.setDate(date);

    // wait briefly for UI to update
    await page.waitForTimeout(100);
    const text = await practice.getDateResultText();
    expect(text).toContain('Chosen date');
    expect(text).toContain('2025');
    expect(text).toContain('12');
  });
});
