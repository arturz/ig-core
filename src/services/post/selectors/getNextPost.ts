import { Page } from 'puppeteer'
import isVisible from '../../../utils/elements/isVisible'
import Post from '../../../types/post/Post'

export default async (page: Page): Promise<Post> => {
  const posts = await page.$$('article')
  for(let index = 0; index < posts.length; index++){
    const post = posts[index]
    if(!(await isVisible(post)))
      continue

    if(posts[index + 1] === undefined)
      throw `Nie ma kolejnego postu`

    return posts[index + 1]
  }

  throw `Nie ma żadnych postów`
}