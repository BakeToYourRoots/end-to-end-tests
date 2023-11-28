import { AboutPage, IndexPage, RobotsTxt } from "./pages";
import { BaseFixtures, test as baseTest } from "testing";
export { expect } from "testing";

type Fixtures = {
  aboutPage: AboutPage;
  indexPage: IndexPage;
  robotsTxt: RobotsTxt;
} & BaseFixtures;

export const test = baseTest.extend<Fixtures>({
  aboutPage: async ({ page }: any, use: any) => {
    const p = new AboutPage(page);
    await p.goto();
    await use(p);
  },
  indexPage: async ({ page }: any, use: any) => {
    const p = new IndexPage(page);
    await p.goto();
    await use(p);
  },
  robotsTxt: async ({ page }: any, use: any) => {
    const p = new RobotsTxt(page);
    await p.goto();
    await use(p);
  },
});
