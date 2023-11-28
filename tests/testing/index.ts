import { expect as baseExpect, test as baseTest } from "@playwright/test";

import { ConsoleFixture, expectation as consoleExpectation } from "./console";
import { expectation as robotsExpectation } from "./robots";

export type BaseFixtures = {
  autoNoErrors: any;
  consoleFixture: ConsoleFixture;
};

export const expect = baseExpect.extend({
  toHaveNoMessagesOfType: consoleExpectation,
  toReferenceSitemaps: robotsExpectation,
});

export const test = baseTest.extend<BaseFixtures>({
  consoleFixture: async ({ page }, use) => {
    const c = new ConsoleFixture(page);
    await use(c);
  },

  autoNoErrors: [
    async ({ consoleFixture }: BaseFixtures, use: any) => {
      await use(consoleFixture);
      expect(consoleFixture).toHaveNoMessagesOfType("error");
    },
    { auto: true },
  ],
});
