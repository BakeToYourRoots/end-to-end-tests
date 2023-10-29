import { type Locator, type Page } from "@playwright/test";

export class IndexPage {
  readonly page: Page;
  readonly description: Locator;

  constructor(page: Page) {
    this.page = page;
    this.description = page.locator(".blog-description");
  }

  async goto() {
    await this.page.goto("/");
  }
}
