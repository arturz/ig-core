import { Page } from 'puppeteer';

export default async (page: Page) => {
  const ub = await page.$('header section > div:last-child div:nth-child(2) button')
  if(ub === null)
    throw `There is no unfollowButton`

  return ub
}