import { test, expect } from "..";

test.describe("Index page", async () => {
  test("has the brand in the title", async ({ indexPage }) => {
    await expect(indexPage.page).toHaveTitle(/Bake to Your Roots/);
  });

  test("has a call to action to 'Learn more'", async ({ indexPage }) => {
    await expect(indexPage.mainContent).toHaveText(/Learn more/i);
  });
});
