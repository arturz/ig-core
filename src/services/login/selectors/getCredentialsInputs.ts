import { Page } from 'puppeteer'
import getForm from './getForm'
import LoginInput from '../../../types/login/LoginInput'
import PasswordInput from '../../../types/login/PasswordInput'

export default async (page: Page): Promise<[ LoginInput, PasswordInput ]>  => {
  const form = await getForm(page)
  const [ loginInput, passwordInput ] = await form.$$('input')

  if(loginInput === undefined)
    throw `Nie ma inputa z loginem (logowanie)`

  if(passwordInput === undefined)
    throw `Nie ma inputa z hasłem (logowanie)`

  return [ loginInput, passwordInput ]
}