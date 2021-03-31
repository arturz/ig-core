import { Page } from 'puppeteer'

export default async (page: Page) => {
  const form = await page.$('form')
  if(form === null)
    throw `Nie można znaleźć formy z loginem i hasłem (przy logowaniu)`

  return form
}