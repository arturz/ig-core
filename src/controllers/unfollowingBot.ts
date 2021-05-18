import { host } from "fork-with-emitter";
import { Page } from "puppeteer";
import log from "../logs/log";
import gotoIndex from "../services/index/gotoIndex";
import unfollow from "../services/profile/unfollow";
import sleep from "../utils/sleep";

export default async (page: Page, maximumUnfollows: number) => {
  if (!maximumUnfollows) throw `Missing maximumUnfollows`;

  while (maximumUnfollows > 0) {
    const login = await host.request("oldestFollowed");
    if (login === null) {
      log("unfollowingBot", "login is null");
      break;
    }

    await page.goto(`https://instagram.com/${login}`);
    await sleep(2000, 4000);
    try {
      await unfollow(page);
    } catch (error) {
      //user may changed login or was unfollowed manually
      console.log(`Can't unfollow ${login}`);
    } finally {
      log("unfollowed", login);
    }

    await sleep(2000, 4000);

    maximumUnfollows--;
  }

  await gotoIndex(page);
};
