import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productList: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator('.inventory_list');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addToCartByTestId(testId: string) {
    const selector = `button[data-test="add-to-cart-${testId}"]`;
    const button = this.page.locator(selector);
    await button.waitFor({ state: 'visible' });
    await button.click();
  }

  async openCart() {
    await this.cartLink.click();
    await this.page.waitForURL('**/cart.html');
  }

  cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }
}
