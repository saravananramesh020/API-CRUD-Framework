import { expect, test } from '../../support/base-test';

test.describe('Regression | Slider controls', () => {
  test.beforeEach(async ({ sliderPage }) => {
    await sliderPage.goto();
  });

  test('clamps values below the minimum bound', async ({ sliderPage }) => {
    await sliderPage.setSlider(-10);
    await expect.poll(async () => await sliderPage.getSliderValueText(), { timeout: 5000 }).toContain('0');
  });

  test('clamps values above the maximum bound', async ({ sliderPage }) => {
    await sliderPage.setSlider(150);
    await expect.poll(async () => await sliderPage.getSliderValueText(), { timeout: 5000 }).toContain('100');
  });

  test('preserves current value when invalid non-numeric input is applied', async ({ sliderPage }) => {
    await sliderPage.setSlider(50);
    await expect.poll(async () => await sliderPage.getSliderValueText(), { timeout: 5000 }).toContain('50');

    await sliderPage.setInvalidInput('foo');
    await expect.poll(async () => await sliderPage.getSliderValueText(), { timeout: 5000 }).toContain('50');
  });
});
