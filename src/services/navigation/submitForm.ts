import { Page } from 'puppeteer'

const getBtn = async (page: Page) => {
  const btn = await page.$('form button')
  if(btn === null)
    throw `Can't select submit form button`

  return btn
}

/*
  form is where is text input, e.g login, challenge, otherwise use clickButton
*/
export default async (page: Page) =>
  await (await getBtn(page)).click()