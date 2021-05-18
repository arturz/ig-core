import { host } from "fork-with-emitter";
import { Page } from "puppeteer";
import getEnvData from "../../config/getEnvData";

const { screenshotDelay } = getEnvData();

export default (page: Page) => {
  let timer: null | NodeJS.Timeout = null;

  async function streamScreenshot() {
    if (timer === null) return;

    host.emit(
      "streaming",
      await page.screenshot({ encoding: "base64", type: "jpeg" })
    );

    if (timer === null) return;

    timer = setTimeout(streamScreenshot, screenshotDelay);
  }

  return {
    async startStreaming() {
      if (timer !== null) return;

      timer = setTimeout(streamScreenshot, 0);

      console.log(`Started streaming`);
    },
    stopStreaming() {
      if (timer === null) return;

      clearTimeout(timer);
      timer = null;
      console.log(`Streaming stopped`);
    },
  };
};
