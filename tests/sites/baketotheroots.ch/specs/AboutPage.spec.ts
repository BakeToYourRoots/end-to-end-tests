import { test, expect } from "..";

test.describe("About page", async () => {
  test("has a working newsletter subscription form", async ({
    aboutPage,
  }: any) => {
    const subscriptionElement = aboutPage.newsletterSubscriptionElement;

    await aboutPage.newsletterSubscriptionElement.subscribeUsing(
      "testing@baketoyourroots.ch",
    );

    const successMessage = expect(subscriptionElement.successMessage);
    await successMessage.toBeVisible();
    await successMessage.toHaveText(/Thank you/i);
  });
});
