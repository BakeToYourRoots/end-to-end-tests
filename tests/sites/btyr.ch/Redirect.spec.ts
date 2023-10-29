import { test, expect } from "@playwright/test";

const domains = ["https://btyr.ch", "https://www.btyr.ch"];

const locations = ["/", "/something-obviously-invalid"];

test.describe("Redirect to the main site", async () => {
  domains.forEach((domain) => {
    locations.forEach((location) => {
      test(`occurs when accessing ${domain}${location}`, async ({ page }) => {
        await page.goto(`${domain}${location}`);
        expect(page.url()).toBe("https://www.baketoyourroots.ch/");
      });
    });
  });
});
