import { Page } from 'puppeteer'
import getFollowersBox from './selectors/getFollowersBox'
import getInnerText from '../../utils/elements/getInnerText'
import getNumberInText from '../../utils/getNumberInText'

export default async (page: Page) => {
  const followersBox = await getFollowersBox(page)
  const text = await getInnerText(followersBox)
  return getNumberInText(text)
}