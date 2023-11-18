import { readFileSync } from "fs";
import { join } from "path";
import { parse } from "yaml";

import { test, expect } from "@playwright/test";

interface HiddenConfig {
  tests: HiddenTestConfig[];
}

interface HiddenTestConfig {
  publicName: string;
  targetUrl: string;
}

const describeHiddenTests = () => {
  const hiddenConfigYaml = readFileSync(
    join(__dirname, "hidden.yml"),
  ).toString();
  const hiddenConfig: HiddenConfig = parse(hiddenConfigYaml);

  hiddenConfig.tests.forEach((testConfig) => {
    test.describe(`Hidden page "${testConfig.publicName}"`, async () => {
      test("is reachable", async ({ page }) => {
        await page.goto(`${testConfig.targetUrl}`);
        await expect(
          page.getByRole("button", { name: "Sign in" }),
        ).toBeVisible();
      });
    });
  });
};

describeHiddenTests();
