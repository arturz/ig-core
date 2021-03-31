import { Page } from 'puppeteer'
import getGoBackFromLikedByButton from './selectors/getGoBackFromLikedByButton'

export default async (page: Page) => {
  const goBackFromLikedByButton = await getGoBackFromLikedByButton(page)
  if(goBackFromLikedByButton === null)
    throw `Nie ma 'goBackFromLikedByButton'`

  await goBackFromLikedByButton.click()
}