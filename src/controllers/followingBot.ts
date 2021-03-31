import { Page } from 'puppeteer'
import scrollToNextPost from '../services/post/scrollToNextPost'
import getLikes from '../services/post/getLikes'
import sleep from '../utils/sleep'
import gotoLikedBy from '../services/post/gotoLikedBy'
import getNextElement from '../utils/elements/getNextElement'
import getPersonList from '../services/likedBy/selectors/getPersonList'
import getPerson from '../services/personRow/getPerson'
import isFollowed from '../logs/isFollowed'
import log from '../logs/log'
import follow from '../services/personRow/follow'
import goBack from '../services/navigation/goBack'
import scrollTo from '../utils/elements/scrollTo'
import getFollowers from '../services/profile/getFollowers'
import getFirstPost from '../services/post/selectors/getFirstPost'
import closeDialog from '../services/dialog/closeDialog'
import isDialog from '../services/dialog/isDialog'
import getNextPost from '../services/post/selectors/getNextPost'
import isOnLikedBy from '../services/likedBy/isOnLikedBy'

const getFollowersFromLogin = async (page: Page, login: string) => {
  const _page = await page.browser().newPage()
  await _page.goto(`https://instagram.com/${login}`)
  const followers = await getFollowers(_page)
  await _page.close()
  console.log(`${login}: ${followers} followers`)
  return followers
}

export default async (page: Page, maximumFollows: number) => {
  if(!maximumFollows)
    throw `Missing maximumFollows`

  let firstTick = true
  while(true){
    //make sure some shit doesn't interrupt job
    if(await isDialog(page))
      await closeDialog(page)

    let post
    if(firstTick){
      post = await getFirstPost(page)
      await scrollTo(post)
      firstTick = false
    } else {
      post = await getNextPost(page)
    }
    //await sleep(100, 1000)
    await sleep(1000, 2000)

    const likes = await getLikes(post)
    console.log(`Likes: ${likes}`)
    if(!likes || likes > 100){
      
      for(let i = 0; i < 3; i++){
        //on cheap vps sometimes next post is not visible - weird shit, try few times
        try {
          await scrollToNextPost(page)
          await sleep(1000, 2000)
          break
        } catch(error) {
          if(i === 2)
            throw error

          console.log('Next post is not visible, trying again...')
          await scrollTo(post)
          await sleep(5000)
        }
      }

      continue
    }

    console.log('Going to liked by')

    await gotoLikedBy(post)
    await sleep(2500, 5000)

    if(!(await isOnLikedBy(page))){
      log('retry', 'goto liked_by')
      await gotoLikedBy(post)
      await sleep(2500, 5000)
    }

    if(!(await isOnLikedBy(page)))
      throw `Should go to liked_by, still on ${page.url()}`

    const personList = await getPersonList(page)
    let personRow
    while(personRow = await getNextElement(personList, { noScroll: true })){
      const person = await getPerson(personRow)
      console.log(person)
      if(person.isSelf || person.isFollowed || await isFollowed(person.login) || await getFollowersFromLogin(page, person.login) > 500){
        await scrollTo(personRow)
        await sleep(100, 300)
        continue
      }

      await sleep(250, 750)

      await follow(personRow)
      log('followed', person.login)

      await sleep(500, 2000)

      if(--maximumFollows === 0){
        await goBack(page)
        await sleep(500, 2000)
        return
      }

      await scrollTo(personRow)
    }

    console.log('Going back')
    await goBack(page)
    await sleep(3000, 5000)
    console.log('Scrolling to next post')
  }
}