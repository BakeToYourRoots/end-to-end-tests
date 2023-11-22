import { type Locator, type Page } from "@playwright/test";

export class IndexPage {
  readonly page: Page;
  readonly mainContent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainContent = page.locator("#main-content");
  }

  async goto() {
    await this.page.goto("/");
  }
}
