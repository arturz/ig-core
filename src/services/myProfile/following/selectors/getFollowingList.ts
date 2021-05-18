import { Page } from "puppeteer";
import FollowingContainer from "../../../../types/profile/following/FollowingContainer";

export default async (page: Page): Promise<FollowingContainer> => {
  const [followingList] = await page.$x("//main//ul//li/..");
  if (followingList === undefined)
    throw `There's no container with poeple you follow`;

  return followingList;
};
