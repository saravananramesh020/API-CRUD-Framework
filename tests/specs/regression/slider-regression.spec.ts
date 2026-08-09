import { test, expect } from '@playwright/test';
import { SliderPage } from '../../pages/slider.page';

test.describe('Regression | Slider controls', () => {
  let slider: SliderPage;

  test.beforeEach(async ({ page }) => {
    slider = new SliderPage(page);
    await slider.goto();
  });

  test('clamps values below the minimum bound', async () => {
    await slider.setSlider(-10);
    await expect.poll(async () => await slider.getSliderValueText(), { timeout: 5000 }).toContain('0');
  });

  test('clamps values above the maximum bound', async () => {
    await slider.setSlider(150);
    await expect.poll(async () => await slider.getSliderValueText(), { timeout: 5000 }).toContain('100');
  });

  test('preserves current value when invalid non-numeric input is applied', async () => {
    await slider.setSlider(50);
    await expect.poll(async () => await slider.getSliderValueText(), { timeout: 5000 }).toContain('50');

    await slider.setInvalidInput('foo');
    await expect.poll(async () => await slider.getSliderValueText(), { timeout: 5000 }).toContain('50');
  });
});
