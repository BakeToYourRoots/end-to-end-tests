import { expect, type Locator, type Page } from "@playwright/test";

export class NewsletterSubscriptionElement {
  private readonly el: Locator;
  private readonly emailField: Locator;
  private readonly subscribeButton: Locator;

  public readonly successMessage: Locator;

  constructor(page: AboutPage) {
    this.el = page.page.locator("btyr-subscribe");

    this.emailField = this.el.locator('input[type="email"]');
    this.subscribeButton = this.el.locator('button[type="submit"]');
    this.successMessage = this.el.getByRole("alert");
  }

  async subscribeUsing(address: string) {
    await expect(this.emailField).toBeVisible();
    await expect(this.subscribeButton).toBeVisible();

    this.emailField.fill(address);
    this.subscribeButton.click();
  }
}

export class AboutPage {
  readonly page: Page;
  readonly newsletterSubscriptionElement: NewsletterSubscriptionElement;

  constructor(page: Page) {
    this.page = page;
    this.newsletterSubscriptionElement = new NewsletterSubscriptionElement(
      this,
    );
  }

  async goto() {
    await this.page.goto("/about/");
  }
}
