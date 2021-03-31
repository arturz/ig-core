import { Page } from 'puppeteer'
import getDialog from './selectors/getDialog'

export default async (page: Page) => {
  return (await getDialog(page)) !== null
}