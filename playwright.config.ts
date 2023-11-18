import { defineConfig } from "@playwright/test";

import { useDevice } from "./util";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "https://www.baketoyourroots.ch",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: useDevice("Desktop Chrome"),
      testDir: "./tests/sites",
    },

    {
      name: "firefox",
      use: useDevice("Desktop Firefox"),
      testDir: "./tests/sites",
    },

    {
      name: "webkit",
      use: useDevice("Desktop Safari"),
      testDir: "./tests/sites",
    },

    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: useDevice("Pixel 5"),
      testDir: "./tests/sites",
    },
    {
      name: "Mobile Safari",
      use: useDevice("iPhone 12"),
      testDir: "./tests/sites",
    },

    /* Test against branded browsers. */
    {
      name: "Microsoft Edge",
      use: { ...useDevice("Desktop Edge"), channel: "msedge" },
      testDir: "./tests/sites",
    },
    {
      name: "Google Chrome",
      use: { ...useDevice("Desktop Chrome"), channel: "chrome" },
      testDir: "./tests/sites",
    },

    // Separate project to run "hidden" tests only in one browser instead of all of them
    {
      name: "hidden",
      use: {
        ...useDevice("Desktop Chrome"),
      },
      testDir: "./tests/hidden",
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
