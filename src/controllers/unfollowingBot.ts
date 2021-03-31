import { Page } from 'puppeteer';
import { master } from 'fork-with-emitter';
import log from '../logs/log';
import sleep from '../utils/sleep';
import gotoIndex from '../services/index/gotoIndex';
import unfollow from '../services/profile/unfollow';

export default async (page: Page, maximumUnfollows: number) => {
  if(!maximumUnfollows)
    throw `Missing maximumUnfollows`

  while(maximumUnfollows > 0){
    const login = await master.request('oldestFollowed')
    if(login === null){
      log('unfollowingBot', 'login is null')
      break
    }

    await page.goto(`https://instagram.com/${login}`)
    await sleep(2000, 4000)
    try {
      await unfollow(page)
    } catch(error) {
      //user may changed login or was unfollowed manually
      console.log(`Can't unfollow ${login}`)
    } finally {
      log('unfollowed', login)
    }

    await sleep(2000, 4000)
    
    maximumUnfollows--;
  }

  await gotoIndex(page)
}