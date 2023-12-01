import { ConsoleMessage, Page } from "@playwright/test";

export class ConsoleFixture {
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

export const expectation = async (console: ConsoleFixture, type: string) => {
  const relevantMessages = console.getMessagesOfType(type);

  const pass = relevantMessages.length == 0;

  const message = pass
    ? () => `Console contains no entries of type "${type}"`
    : () =>
        `Console contains ${
          relevantMessages.length
        } entries of type "${type}":\n${relevantMessages.join("\n")}`;

  return {
    message,
    name: "toHaveNoMessagesOfType",
    expected: 0,
    actual: relevantMessages.length,
    pass,
  };
};
