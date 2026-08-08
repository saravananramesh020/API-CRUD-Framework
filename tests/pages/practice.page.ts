import { Page } from '@playwright/test';

export type BasicFormData = {
  username?: string;
  password?: string;
  email?: string;
  phone?: string;
  bio?: string;
};

export class PracticePage {
  readonly page: Page;
  readonly section = '/practice#section-1';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.section);
    await this.page.waitForSelector('#section-1');
  }

  // Basic Form
  async fillBasicForm(data: BasicFormData) {
    if (data.username !== undefined) await this.page.fill('#text-input', data.username);
    if (data.password !== undefined) await this.page.fill('#password-input', data.password);
    if (data.email !== undefined) await this.page.fill('#email-input', data.email);
    if (data.phone !== undefined) await this.page.fill('#phone-input', data.phone);
    if (data.bio !== undefined) await this.page.fill('#textarea-input', data.bio);
  }

  async submitForm() {
    await this.page.click('#form-submit');
    await this.page.waitForSelector('[data-testid="form-result"]');
  }

  async resetForm() {
    await this.page.click('#form-reset');
  }

  async getFormResultText() {
    return (await this.page.locator('[data-testid="form-result"]').innerText()).trim();
  }

  // Slider
  async setSlider(value: number) {
    const slider = this.page.locator('#slider-input');
    await slider.waitFor({ state: 'visible' });
    const box = await slider.boundingBox();
    if (!box) {
      // fallback: set via value and dispatch events
      await slider.evaluate((el, v) => {
        (el as HTMLInputElement).value = String(v);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }, value);
      return;
    }

    const min = await slider.evaluate((el) => Number((el as HTMLInputElement).min || 0));
    const max = await slider.evaluate((el) => Number((el as HTMLInputElement).max || 100));
    const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
    const x = box.x + pct * box.width;
    const y = box.y + box.height / 2;

    // Move to slider and drag the handle
    await this.page.mouse.move(box.x + box.width / 2, y);
    await this.page.mouse.down();
    await this.page.mouse.move(x, y, { steps: 5 });
    await this.page.mouse.up();

    // Try React-friendly native setter + events to ensure framework picks up value change
    await slider.evaluate((el, v) => {
      const value = String(v);
      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      if (nativeSetter) {
        nativeSetter.call(el, value);
      } else {
        (el as HTMLInputElement).value = value;
      }
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }, value);
  }

  async getSliderValueText() {
    return (await this.page.locator('[data-testid="slider-result"]').innerText()).trim();
  }

  // Date picker
  async setDate(value: string) {
    // value should be YYYY-MM-DD
    await this.page.fill('#date-input', value);
    await this.page.locator('#date-input').dispatchEvent('input');
    await this.page.locator('#date-input').dispatchEvent('change');
  }

  async getDateResultText() {
    return (await this.page.locator('[data-testid="date-result"]').innerText()).trim();
  }
}
