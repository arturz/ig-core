import { Page } from 'puppeteer'
import getCredentialsInputs from './selectors/getCredentialsInputs'

export default async (page: Page) => {
  const [, passwordInput ] = await getCredentialsInputs(page)

  //press enter in input within form to submit it
  await passwordInput.focus()
  await page.keyboard.press(String.fromCharCode(13))
}