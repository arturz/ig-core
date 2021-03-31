import { Page } from 'puppeteer'
import getProfileUrl from './getProfileUrl'

export default (page: Page) =>
  page.url() === getProfileUrl()