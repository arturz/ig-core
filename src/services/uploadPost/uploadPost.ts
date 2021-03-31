import { Page } from 'puppeteer'
import gotoIndex from '../index/gotoIndex'
import getNextButton from './selectors/getNextButton'

export default (page: Page) => async (filePath: string) => {
  await gotoIndex(page)
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click('[class*="New_post"]'),
  ])
  await fileChooser.accept([filePath])

  await page.waitFor(1000)

  //close edition
  ;(await getNextButton(page)).click()

  await page.waitFor(1000)

  //publish
  ;(await getNextButton(page)).click()
} 