import { Page } from 'puppeteer'

export default async (page: Page) => {
  const confirmDialogButton = await page.$('div[role="dialog"]:first-child button')
  if(confirmDialogButton === null)
    throw `Can't get confirm dialog button`

  return confirmDialogButton
}