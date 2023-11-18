import { devices } from "@playwright/test";

import { version } from "./package.json";

export const useDevice = (name: string) => {
  const device = { ...devices[name] };
  return {
    ...device,
    userAgent: `${device.userAgent} btyr-end-to-end-tests-bot/${version}`,
  };
};
