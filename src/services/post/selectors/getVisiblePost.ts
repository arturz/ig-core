import { Page } from 'puppeteer'
import isVisible from '../../../utils/elements/isVisible'
import Post from '../../../types/post/Post'
import scrollTo from '../../../utils/elements/scrollTo'

export default async (page: Page): Promise<Post> => {
  const posts = await page.$$('article')
  for(const post of posts){
    if(await isVisible(post)){
      await scrollTo(post)
      return post
    }
  }

  throw `Nie ma widocznego postu`
}