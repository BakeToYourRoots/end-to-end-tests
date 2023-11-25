import { test as base } from "@playwright/test";
import { AboutPage, IndexPage } from "./pages";

type Fixtures = {
  aboutPage: AboutPage;
  indexPage: IndexPage;
};

export const test = base.extend<Fixtures>({
  aboutPage: async ({ page }, use) => {
    const p = new AboutPage(page);
    await p.goto();
    await use(p);
  },
  indexPage: async ({ page }, use) => {
    const p = new IndexPage(page);
    await p.goto();
    await use(p);
  },
});

export { expect } from "@playwright/test";
