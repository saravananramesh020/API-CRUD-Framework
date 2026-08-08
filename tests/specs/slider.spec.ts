import { test, expect } from '@playwright/test';
import { PracticePage } from '../pages/practice.page';

test.describe('Practice page - Slider', () => {
  test('slider moves and updates value', async ({ page }) => {
    const practice = new PracticePage(page);
    await practice.goto();

    // set slider to 80
    await practice.setSlider(80);

    // Set slider to 80 and wait for UI to update
    await practice.setSlider(80);
    await expect.poll(async () => await practice.getSliderValueText(), { timeout: 5000 }).toContain('80');
  });
});
