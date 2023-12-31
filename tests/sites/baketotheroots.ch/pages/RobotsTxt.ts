import { type Page } from "@playwright/test";

export class RobotsTxt {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/robots.txt");
  }
}
