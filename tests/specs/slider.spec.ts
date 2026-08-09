import { test, expect } from '@playwright/test';
import { PracticePage } from '../pages/practice.page';

test.describe('Practice page - Slider', () => {
  test('slider moves and updates value', async ({ page }) => {
    const practice = new PracticePage(page);
    await practice.goto();

    await practice.setSlider(80);
    await expect.poll(async () => await practice.getSliderValueText(), { timeout: 5000 }).toContain('80');
  });

  test('slider clamps values below minimum to the lower bound', async ({ page }) => {
    const practice = new PracticePage(page);
    await practice.goto();

    await practice.setSlider(-10);
    await expect.poll(async () => await practice.getSliderValueText(), { timeout: 5000 }).toContain('0');
  });

  test('slider clamps values above maximum to the upper bound', async ({ page }) => {
    const practice = new PracticePage(page);
    await practice.goto();

    await practice.setSlider(150);
    await expect.poll(async () => await practice.getSliderValueText(), { timeout: 5000 }).toContain('100');
  });

  test('slider ignores invalid non-numeric input and preserves current value', async ({ page }) => {
    const practice = new PracticePage(page);
    await practice.goto();

    await practice.setSlider(50);
    await expect.poll(async () => await practice.getSliderValueText(), { timeout: 5000 }).toContain('50');

    await page.locator('#slider-input').evaluate((el) => {
      (el as HTMLInputElement).value = 'foo';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });

    await expect.poll(async () => await practice.getSliderValueText(), { timeout: 5000 }).toContain('50');
  });
});
