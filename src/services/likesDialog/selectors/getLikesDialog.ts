import { Page } from 'puppeteer'
import LikesDialog from '../../../types/likesDialog/LikesDialog'

/* 
  Please note, that this doesn't return dialog itself
  but parent of element that contains personRows
 */
export default async (page: Page): Promise<LikesDialog> => {
  const [ likesDialog ] = await page.$x('//div[@role="dialog"]//div[@aria-labelledby]/..')
  if(likesDialog === undefined)
    throw `Nie ma boxa z ludźmi, którzy polubili`

  return likesDialog
}