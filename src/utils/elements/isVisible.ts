import { ElementHandle } from 'puppeteer'
import { HEADER_HEIGHT } from '../../constants'
import getBoundingClientRect from './getBoundingClientRect'

export default async (element: ElementHandle) => {
  const { top, height } = await getBoundingClientRect(element)
  return top + height > HEADER_HEIGHT
}