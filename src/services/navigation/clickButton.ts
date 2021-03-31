import { Page } from 'puppeteer'
import random from 'random-int'

const getBtn = async (page: Page) => {
  const btn = await page.$('button')
  if(btn === null)
    throw `Can't select button`
  return btn
}

export default async (page: Page) => {
  const btn = await getBtn(page)

  const { x, y, width, height } = await page.evaluate((btn) => {
    const { x, y, width, height } = btn.getBoundingClientRect()
    return { x, y, width, height }
  }, btn)
  const cX = random(x+5, x+width-5)
  const cY = random(y+5, y+height-5)
  await page.mouse.click(cX, cY, {
    delay: random(100, 200)
  })
}