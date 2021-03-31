import { Page } from 'puppeteer'
import getCredentials from '../config/getCredentials'
import typeCredentials from '../services/login/typeCredentials'
import submitCredentials from '../services/login/submitCredentials'
import sleep from '../utils/sleep'
import log from '../logs/log'
import isChallenge from '../services/login/isChallenge'
import submitForm from '../services/navigation/submitForm'
import afterLogin from './utils/afterLogin'

const path = '/accounts/login'

type Response = 'success' | 'challenge' | 'error'

export default async (page: Page, credentials = getCredentials()): Promise<Response> => {
  console.log(`Login as ${credentials.login}`)

  await page.goto(`https://instagram.com${path}?source=auth_switcher`)
  
  //page was redirected to main page - user already logged in
  if(!page.url().includes(path)){
    console.log(`User was already logged in`)
    log('login', 'already_logged_in')
    return 'success'
  }

  await sleep(1000, 3000)

  await typeCredentials(page, credentials)
  await submitCredentials(page)

  await sleep(8000, 12000)

  if(page.url().includes(path)){
    console.log(`Can't log in (${credentials.login})`)
    log('login', 'error')
    return 'error'
  }

  if(await isChallenge(page)){
    //skip info about challenge
    await submitForm(page)
    await sleep(3000, 6000)
    log('login', 'challenge')
    return 'challenge'
  }

  await afterLogin(page)

  log('login', 'success')
  return 'success'
} 