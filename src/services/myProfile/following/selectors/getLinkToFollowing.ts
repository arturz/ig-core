import { Page } from 'puppeteer'
import LinkToFollowing from '../../../../types/profile/following/LinkToFollowing'
import getCredentials from '../../../../config/getCredentials'
import isOnProfile from '../../isOnProfile'

export default async (page: Page): Promise<LinkToFollowing> => {
  if(!(await isOnProfile(page)))
    throw `Nie można pobrać LinkToFollowing, gdy użytkownik nie znajduje się na profilu`

  const { login } = await getCredentials()
  const linkToFollowing = await page.$(`a[href*="${login}/following"]`)
  if(linkToFollowing === null)
    throw `Nie można pobrać LinkToFollowing`

  return linkToFollowing
}