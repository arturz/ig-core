import { ElementHandle } from 'puppeteer'
import addData from './dataset/addData'
import deleteData from './dataset/deleteData'

export default async (element: ElementHandle, xpath: string) => {
  const className = Math.random().toString()
  addData(element, className, className)

  let matchingElement = (await element.$x(`//*[@data-${className}="${className}"]${xpath}`))[0] || null
  
  deleteData(element, className)
  return matchingElement
}