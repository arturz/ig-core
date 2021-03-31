import { Page } from 'puppeteer'
import random from 'random-int'
import getCredentialsInputs from './selectors/getCredentialsInputs'
import Credentials from '../../types/Credentials'

export default async (page: Page, credentials: Credentials) => {
  const [ loginInput, passwordInput ] = await getCredentialsInputs(page)

  await loginInput.type(credentials.login, { delay: random(70, 120) })
  await passwordInput.type(credentials.password, { delay: random(70, 120) })
}