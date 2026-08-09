import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
  }

  async itemCount() {
    return await this.cartItems.count();
  }

  async getItemNames() {
    const count = await this.cartItems.count();
    const names: string[] = [];
    for (let i = 0; i < count; i++) {
      const name = await this.cartItems.nth(i).locator('.inventory_item_name').innerText();
      names.push(name.trim());
    }
    return names;
  }

  async removeByTestId(testId: string) {
    const selector = `button[data-test="remove-${testId}"]`;
    const btn = this.page.locator(selector);
    await btn.waitFor({ state: 'visible' });
    await btn.click();
  }
}
