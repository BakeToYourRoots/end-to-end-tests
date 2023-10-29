import { test as base } from "@playwright/test";
import { IndexPage } from "./pages/IndexPage";

type Fixtures = {
  indexPage: IndexPage;
};

export const test = base.extend<Fixtures>({
  indexPage: async ({ page }, use) => {
    const p = new IndexPage(page);
    await p.goto();
    await use(p);
  },
});

export { expect } from "@playwright/test";
