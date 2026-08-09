import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class SliderPage extends BasePage {
  private readonly sliderSelector = '#slider-input';
  private readonly resultSelector = '[data-testid="slider-result"]';

  constructor(page: Page) {
    super(page, '/practice#section-1');
  }

  protected async waitForPageLoad() {
    await this.page.waitForSelector('#section-1');
    await this.page.waitForSelector(this.sliderSelector);
  }

  async setSlider(value: number) {
    const slider = this.page.locator(this.sliderSelector);
    await slider.waitFor({ state: 'visible' });

    const box = await slider.boundingBox();
    if (!box) {
      await this.setSliderValueDirectly(slider, value);
      return;
    }

    const min = await slider.evaluate((el) => Number((el as HTMLInputElement).min || 0));
    const max = await slider.evaluate((el) => Number((el as HTMLInputElement).max || 100));
    const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
    const x = box.x + pct * box.width;
    const y = box.y + box.height / 2;

    await this.page.mouse.move(box.x + box.width / 2, y);
    await this.page.mouse.down();
    await this.page.mouse.move(x, y, { steps: 5 });
    await this.page.mouse.up();

    await this.setSliderValueDirectly(slider, value);
  }

  async setInvalidInput(value: string) {
    await this.page.locator(this.sliderSelector).evaluate((el, inputValue) => {
      (el as HTMLInputElement).value = inputValue;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }, value);
  }

  async getSliderValueText() {
    return (await this.page.locator(this.resultSelector).innerText()).trim();
  }

  private async setSliderValueDirectly(slider: import('@playwright/test').Locator, value: number) {
    await slider.evaluate((el, sliderValue) => {
      const valueAsString = String(sliderValue);
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      if (nativeSetter) {
        nativeSetter.call(el, valueAsString);
      } else {
        (el as HTMLInputElement).value = valueAsString;
      }
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }, value);
  }
}
