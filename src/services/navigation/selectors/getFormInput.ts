import { Page } from 'puppeteer'

export default async (page: Page) => {
  const input = await page.$('form input')
  if(input === null)
    throw `Can't select form input`

  return input
}