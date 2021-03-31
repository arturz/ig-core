import { Page } from 'puppeteer'

export default async (page: Page) => {
  const post = await page.$('article')
  if(post === null)
    throw `There is no first post`

  return post
}