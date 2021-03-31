import { Page } from 'puppeteer';

export default async (page: Page) => {
  const followersBox = await page.$('main ul li:nth-child(2)')
  if(followersBox === null)
    throw `Can't select followersBox`

  return followersBox
}