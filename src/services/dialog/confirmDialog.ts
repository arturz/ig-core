import { Page } from 'puppeteer'
import getConfirmDialogButton from './selectors/getConfirmDialogButton'

export default async (page: Page) => {
  const confirmDialogButton = await getConfirmDialogButton(page)
  await confirmDialogButton.click()
}