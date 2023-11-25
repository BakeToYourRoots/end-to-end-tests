import { test as base } from "@playwright/test";
import { AboutPage, IndexPage, RobotsTxt } from "./pages";

type Fixtures = {
  aboutPage: AboutPage;
  indexPage: IndexPage;
  robotsTxt: RobotsTxt;
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
  robotsTxt: async ({ page }, use) => {
    const p = new RobotsTxt(page);
    await p.goto();
    await use(p);
  },
});

import { expect as baseExpectations } from "@playwright/test";
import robotsParser from "robots-parser";

export const expect = baseExpectations.extend({
  async toReferenceSitemaps(robotsTxt: RobotsTxt) {
    const fileContents = await robotsTxt.page.content();

    const parsedRobotsTxt = robotsParser(process.env.BASE_URL!, fileContents);
    const numberOfSitemaps = parsedRobotsTxt.getSitemaps().length;

    const pass = numberOfSitemaps > 0;

    const message = pass
      ? () => `robots.txt references ${numberOfSitemaps} sitemaps.`
      : () => "robots.txt does not reference any sitemaps.";

    return {
      message,
      name: "toReferenceSitemaps",
      expected: "> 0",
      actual: numberOfSitemaps,
      pass,
    };
  },
});
