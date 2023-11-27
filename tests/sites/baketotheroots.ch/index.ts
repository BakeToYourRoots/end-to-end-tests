import { ConsoleMessage, Page, TestInfo, test as base } from "@playwright/test";
import { AboutPage, IndexPage, RobotsTxt } from "./pages";

type Fixtures = {
  autoNoErrors: any;
  consoleFixture: ConsoleFixture;

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
  consoleFixture: async ({ page }, use) => {
    const c = new ConsoleFixture(page);
    await use(c);
  },

  autoNoErrors: [
    async ({ consoleFixture }: Fixtures, use: any, _: TestInfo) => {
      await use(consoleFixture);
      expect(consoleFixture).toHaveNoMessagesOfType("error");
    },
    { auto: true },
  ],
});

import { expect as baseExpectations } from "@playwright/test";
import robotsParser from "robots-parser";

class ConsoleFixture {
  private readonly messages: ConsoleMessage[] = [];
  constructor(page: Page) {
    page.on("console", (consoleMessage: ConsoleMessage) => {
      this.messages.push(consoleMessage);
    });
  }

  public getMessagesOfType(type: string): ConsoleMessage[] {
    return this.messages.filter((m) => m.type() == type);
  }
}

export const expect = baseExpectations.extend({
  async toHaveNoMessagesOfType(console: ConsoleFixture, type: string) {
    const relevantMessages = console.getMessagesOfType(type);

    const pass = relevantMessages.length == 0;

    const message = pass
      ? () => `Console contains no entries of type "${type}"`
      : () =>
          `Console contains ${relevantMessages.length} entries of type "${type}"`;

    return {
      message,
      name: "toHaveNoMessagesOfType",
      expected: 0,
      actual: relevantMessages.length,
      pass,
    };
  },

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
