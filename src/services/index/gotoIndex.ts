import { Page } from 'puppeteer'
import sleep from '../../utils/sleep'

export default async (page: Page) => {
  await page.goto('https://instagram.com/')
}