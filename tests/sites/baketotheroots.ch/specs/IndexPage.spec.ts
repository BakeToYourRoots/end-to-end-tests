import { test, expect } from "..";

test.describe("Index page", async () => {
  test("has the brand in the title", async ({ indexPage }) => {
    await expect(indexPage.page).toHaveTitle(/Bake to Your Roots/);
  });

  test("tells readers to 'stay tuned'", async ({ indexPage }) => {
    await expect(indexPage.description).toHaveText(/stay tuned/i);
  });
});
