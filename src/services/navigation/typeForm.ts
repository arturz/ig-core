import { Page } from 'puppeteer'
import random from 'random-int'
import getFormInput from './selectors/getFormInput'

export default async (page: Page, text: string) => {
  const input = await getFormInput(page)

  //select input text if exists (typing will overwrite it)
  await input.click({ clickCount: 3 })

  await input.type(text.toString(), { delay: random(70, 120) })
}