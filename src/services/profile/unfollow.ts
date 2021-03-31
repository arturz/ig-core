import { Page } from 'puppeteer';
import getUnfollowButton from './selectors/getUnfollowButton';
import isDialog from '../dialog/isDialog';
import confirmDialog from '../dialog/confirmDialog';
import sleep from '../../utils/sleep';

export default async (page: Page) => {
  const ub = await getUnfollowButton(page)
  ub.click()

  await sleep(1500, 3000)

  if(await isDialog(page))
    await confirmDialog(page)
}