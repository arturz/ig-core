import { Page } from "puppeteer";
import isFollowed from "../logs/isFollowed";
import log from "../logs/log";
import closeDialog from "../services/dialog/closeDialog";
import isDialog from "../services/dialog/isDialog";
import isOnLikedBy from "../services/likedBy/isOnLikedBy";
import getPersonList from "../services/likedBy/selectors/getPersonList";
import goBack from "../services/navigation/goBack";
import follow from "../services/personRow/follow";
import getPerson from "../services/personRow/getPerson";
import getLikes from "../services/post/getLikes";
import gotoLikedBy, { getLinkToLikedBy } from "../services/post/gotoLikedBy";
import scrollToNextPost from "../services/post/scrollToNextPost";
import getFirstPost from "../services/post/selectors/getFirstPost";
import getVisiblePost from "../services/post/selectors/getVisiblePost";
import getFollowers from "../services/profile/getFollowers";
import getNextElement from "../utils/elements/getNextElement";
import scrollTo from "../utils/elements/scrollTo";
import sleep from "../utils/sleep";

const getFollowersFromLogin = async (page: Page, login: string) => {
  const _page = await page.browser().newPage();
  await _page.goto(`https://instagram.com/${login}`);
  const followers = await getFollowers(_page);
  await _page.close();
  console.log(`${login}: ${followers} followers`);
  return followers;
};

export default async (page: Page, maximumFollows: number) => {
  if (!maximumFollows) throw `Missing maximumFollows`;

  let firstIteration = true;
  while (true) {
    //make sure something doesn't interrupt job
    if (await isDialog(page)) await closeDialog(page);

    let post;
    while (true) {
      if (firstIteration) {
        post = await getFirstPost(page);
        await scrollTo(post);
        firstIteration = false;
      } else {
        await scrollToNextPost(page);
        post = await getVisiblePost(page);
      }
      await sleep(1000, 2000);

      const likes = await getLikes(post);
      if (!likes) continue;

      try {
        await getLinkToLikedBy(post);
      } catch (error) {
        continue;
      }

      break;
    }

    console.log("Going to liked by");

    await gotoLikedBy(post);
    await sleep(2500, 5000);

    if (!(await isOnLikedBy(page))) {
      log("retry", "goto liked_by");
      await gotoLikedBy(post);
      await sleep(2500, 5000);
    }

    if (!(await isOnLikedBy(page)))
      throw `Should go to liked_by, still on ${page.url()}`;

    const personList = await getPersonList(page);
    let personRow;
    while ((personRow = await getNextElement(personList, { noScroll: true }))) {
      const person = await getPerson(personRow);
      console.log(person);
      if (
        person.isSelf ||
        person.isFollowed ||
        (await isFollowed(person.login)) ||
        (await getFollowersFromLogin(page, person.login)) > 500
      ) {
        await scrollTo(personRow);
        await sleep(100, 300);
        continue;
      }

      await sleep(250, 750);

      await follow(personRow);
      log("followed", person.login);

      await sleep(500, 2000);

      if (--maximumFollows === 0) {
        await goBack(page);
        await sleep(500, 2000);
        return;
      }

      await scrollTo(personRow);
    }

    console.log("Going back");
    await goBack(page);
    await sleep(3000, 5000);
    console.log("Scrolling to next post");
  }
};
