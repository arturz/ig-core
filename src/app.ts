import { host, isFork } from "fork-with-emitter";
import loadPage from "./loaders/page";
import loadSubscribers from "./loaders/subscibers";
import log from "./logs/log";

process.on("uncaughtExceptionMonitor", async (err) => {
  log("error", err);
});

const starting = (async () => {
  console.log("Loading page...");
  const page = await loadPage();
  console.log("Page loaded");
  await loadSubscribers(page);
})();

if (isFork) {
  host.onRequest("start", () => starting);
}
