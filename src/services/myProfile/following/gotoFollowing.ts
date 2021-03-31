import { Page } from 'puppeteer'
import gotoProfile from '../gotoProfile'
import sleep from '../../../utils/sleep'
import getLinkToFollowing from './selectors/getLinkToFollowing'

export default async (page: Page) => {
  //start from profile
  await gotoProfile(page)

  const linkToFollowing = await getLinkToFollowing(page)
  await linkToFollowing.click()
  await sleep(2000, 4000)
}