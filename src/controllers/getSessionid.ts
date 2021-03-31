import { Page } from 'puppeteer'
import typeCredentials from '../services/login/typeCredentials'
import submitCredentials from '../services/login/submitCredentials'
import sleep from '../utils/sleep'
import log from '../logs/log'

const path = 'instagram.com/accounts/login'

export default async (page: Page, { login, password }: { login: string, password: string }) => {
  await page.goto(`https://${path}?source=auth_switcher`)
  await sleep(3000, 6000)
  
  //page was redirected to main page - user already logged in
  if(!page.url().includes(path))
    throw `Already logged in as ${login}`

  await typeCredentials(page, { login, password })
  await submitCredentials(page)

  await sleep(3000, 6000)

  if(page.url().includes(path))
    throw `Can't log in as ${login} (invalid path)`

  const cookie = (await page.cookies()).find(cookie => cookie.name === 'sessionid')
  if(!cookie)
    throw `Can't log in as ${login} (missing cookie)`

  log('logged', login)
  
  return cookie.value
}