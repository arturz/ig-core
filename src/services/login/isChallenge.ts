import { Page } from 'puppeteer';
import getFormInput from '../navigation/selectors/getFormInput';

export default async (page: Page) => {
  if(!page.url().includes('instagram.com/challenge'))
    return false

  try {
    await getFormInput(page)
  } catch(error) {
    return false
  }

  return true
}