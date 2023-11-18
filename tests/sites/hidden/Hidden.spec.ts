import { test, expect } from "@playwright/test";

import { readFileSync } from "fs";
import { parse } from "yaml";

interface HiddenConfig {
  tests: HiddenTestConfig[];
}

interface HiddenTestConfig {
  publicName: string;
  targetUrl: string;
}

const describeHiddenTests = () => {
  const hiddenConfigYaml = readFileSync("./hidden.yml").toString();
  const hiddenConfig: HiddenConfig = parse(hiddenConfigYaml);

  hiddenConfig.tests.forEach((testConfig) => {
    test.describe(`Hidden page "${testConfig.publicName}"`, async () => {
      test("is reachable", async ({ page }) => {
        await page.goto(`${testConfig.targetUrl}`);
        expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
      });
    });
  });
};

describeHiddenTests();
