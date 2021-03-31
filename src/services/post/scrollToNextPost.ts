import { Page } from 'puppeteer'
import getNextPost from './selectors/getNextPost'
import scrollTo from '../../utils/elements/scrollTo'

export default async (page: Page) => {
  await scrollTo(
    await getNextPost(page)
  )
}