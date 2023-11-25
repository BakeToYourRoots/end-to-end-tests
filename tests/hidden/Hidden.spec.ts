import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "yaml";

import { test, expect } from "@playwright/test";

interface HiddenConfig {
  reachable: TestConfig[];
  uncrawlable: TestConfig[];
}

interface TestConfig {
  publicName: string;
  targetUrl: string;
}

const describeHiddenTests = () => {
  const hiddenConfigYaml = readFileSync(
    join(__dirname, "hidden.yml"),
  ).toString();
  const hiddenConfig: HiddenConfig = parse(hiddenConfigYaml);

  hiddenConfig.reachable.forEach((testConfig) => {
    test.describe(`Hidden page "${testConfig.publicName}"`, async () => {
      test("is reachable", async ({ page }) => {
        await page.goto(`${testConfig.targetUrl}`);
        await expect(
          page.getByRole("button", { name: "Sign in" }),
        ).toBeVisible();
      });
    });
  });

  hiddenConfig.uncrawlable.forEach((testConfig) => {
    test.describe(`Hidden page "${testConfig.publicName}"`, async () => {
      test("is uncrawlable", async ({ request }) => {
        const response = await request.get(`${testConfig.targetUrl}`);

        const maybeHeader = response
          .headersArray()
          .find((header) => header.name == "X-Robots-Tag");
        expect(maybeHeader).toBeDefined();

        const headerValue = maybeHeader!.value;
        expect(["none", "noindex"]).toContain(headerValue);
      });
    });
  });
};

describeHiddenTests();
