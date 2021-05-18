import { Page } from "puppeteer";
import getGoBackFromLikedByButton from "./selectors/getGoBackFromLikedByButton";

export default async (page: Page) => {
  const goBackFromLikedByButton = await getGoBackFromLikedByButton(page);
  if (goBackFromLikedByButton === null)
    throw `There's no 'goBackFromLikedByButton'`;

  await goBackFromLikedByButton.click();
};
