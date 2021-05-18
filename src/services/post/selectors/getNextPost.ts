import { Page } from "puppeteer";
import Post from "../../../types/post/Post";
import isVisible from "../../../utils/elements/isVisible";

export default async (page: Page): Promise<Post> => {
  const posts = await page.$$("article");
  for (let index = 0; index < posts.length; index++) {
    const post = posts[index];
    if (!(await isVisible(post))) continue;

    if (posts[index + 1] === undefined) throw `There's no next post`;

    return posts[index + 1];
  }

  throw `There's no post`;
};
