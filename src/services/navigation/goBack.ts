import { Page } from 'puppeteer'

const getBtn = async (page: Page) => {
  const header = await page.$('header')
  if(!header)
    throw `No header`

  /*
    !!!
    First div contains info about cookies,
    second is real header
  */
  if((await header.$$('*')).length >= 2){
    const btn = await header.$('*:nth-child(2) button')
    if(!btn)
      throw `No button (with info about cookies)`

    return btn
  }

  const btn = await header.$('*:first-child button')
  if(!btn)
    throw `No header button`

  return btn
}

export default async (page: Page) => {
  (await getBtn(page)).click()
}