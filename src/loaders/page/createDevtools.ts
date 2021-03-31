import { Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra'
const devtools = require('puppeteer-extra-plugin-devtools')()

devtools.setAuthCredentials('insta', 'gram')
puppeteer.use(devtools)

export default (() => {
  let tunnel: any = null

  return async (page: Page) => {
    if(tunnel === null){
      tunnel = await devtools.createTunnel(page.browser())
      return tunnel.url
    }

    return tunnel.url
  }
})()