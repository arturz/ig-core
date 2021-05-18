import { Page } from "puppeteer";
import getCredentials from "../../../../config/getCredentials";
import LinkToFollowing from "../../../../types/profile/following/LinkToFollowing";
import isOnProfile from "../../isOnProfile";

export default async (page: Page): Promise<LinkToFollowing> => {
  if (!(await isOnProfile(page)))
    throw `You must be on profile to perform this action`;

  const { login } = await getCredentials();
  const linkToFollowing = await page.$(`a[href*="${login}/following"]`);
  if (linkToFollowing === null)
    throw `There's no link leading to people you follow`;

  return linkToFollowing;
};
