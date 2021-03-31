import { Page } from 'puppeteer'

export default (page: Page) =>
  page.url().includes('/liked_by')