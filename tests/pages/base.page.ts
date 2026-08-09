import { Page } from '@playwright/test';

export abstract class BasePage {
  readonly page: Page;
  readonly path: string;

  protected constructor(page: Page, path: string) {
    this.page = page;
    this.path = path;
  }

  async goto() {
    await this.page.goto(this.path);
    await this.waitForPageLoad();
  }

  protected abstract waitForPageLoad(): Promise<void>;
}
