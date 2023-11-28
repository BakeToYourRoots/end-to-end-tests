import { test, expect } from "..";

test.describe("The robots.txt file", async () => {
  test("contains at least one sitemap", async ({ robotsTxt }: any) => {
    await expect(robotsTxt).toReferenceSitemaps();
  });
});
