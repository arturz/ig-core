import { Page } from 'puppeteer';

export default async (page: Page) => {
  const [el] = await page.$x('//main//div[@aria-labelledby]/..')
  if(!el)
    throw `Can't get personList`

  return el
}