import { Page } from 'puppeteer'

export default async (page: Page) => {
  const btns = await page.$$('header button')
  const btn = btns[btns.length-1]
  return btn
}