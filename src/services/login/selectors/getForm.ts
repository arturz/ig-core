import { Page } from "puppeteer";

export default async (page: Page) => {
  const form = await page.$("form");
  if (form === null) throw `There's no form to fill-in credentials`;

  return form;
};
