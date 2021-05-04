import { master } from "fork-with-emitter";
import { Page } from "puppeteer";
import sleep from "sleep-promise";
import { getGroupedCommands, runCommand } from "../commands";
import createStreamingController from "../loaders/page/createStreamingController";
import log from "../logs/log";

const exit = async (page: Page) => {
  try {
    page.browser().close();
  } catch (error) {
    process.exit(0);
  }

  //make sure process is terminated
  await sleep(5000);
  process.exit(0);
};

export default (page: Page) => {
  master.on("exit", exit);

  const { startStreaming, stopStreaming } = createStreamingController(page);
  master.on("startStreaming", startStreaming);
  master.on("stopStreaming", stopStreaming);

  master.onRequest("getCommands", async () => getGroupedCommands(page));

  master.onRequest(
    "executeCommand",
    async function ({ name, payload }: { name: string; payload: any }) {
      if (payload === undefined) log("executeCommand", `${name}()`);
      else if (name === "login")
        log(
          "executeCommand",
          `${name}(${JSON.stringify({
            ...payload,
            password: "*".repeat(payload.password.length),
          })}`
        );
      else if (typeof payload === "object")
        log("executeCommand", `${name}(${JSON.stringify(payload)})`);
      else log("executeCommand", `${name}(${payload})`);

      return await runCommand(page, name, payload);
    }
  );
};
