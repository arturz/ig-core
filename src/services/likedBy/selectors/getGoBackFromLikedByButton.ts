import { Page } from 'puppeteer'

export default async (page: Page) => {
  return await page.$('header button')
}