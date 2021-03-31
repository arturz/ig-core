import { Page } from 'puppeteer'
import isOnProfile from './isOnProfile'
import getProfileUrl from './getProfileUrl'
import sleep from '../../utils/sleep'

export default async (page: Page) => {
  if(await isOnProfile(page)){
    console.log(`gotoProfile: user is already on profile page (${page.url()})`)
    return
  }

  console.log(`gotoProfile from ${page.url()}`)

  await page.goto(getProfileUrl())
  await sleep(2000, 4000)
}