import { Page } from 'puppeteer'
import sleep from 'sleep-promise'
import decamelize from 'decamelize'
import { master } from 'fork-with-emitter'
import path from 'path'
import { getSupervisorsWithTypes } from '../supervisors'
import log from '../logs/log'
import getEnvData from '../config/getEnvData'

import createStreamingController from '../loaders/page/createStreamingController'

const exit = async (page: Page) => {
  try {
    page.browser().close()
  } catch(error) {
    process.exit(0)
  }

  //make sure process is terminated
  await sleep(5000)
  process.exit(0)
}

export default (page: Page) => {
  master.on('exit', exit)

  const { startStreaming, stopStreaming } = createStreamingController(page)
  master.on('startStreaming', startStreaming)
  master.on('stopStreaming', stopStreaming)

  const supervisors = getSupervisorsWithTypes(page)
  master.onRequest('getSupervisors', () =>
    Object.entries(supervisors)
      .map(([ name, { type, supervisor } ]) => ({
        title: decamelize(name, ' '),
        name,
        arity: supervisor.length,
        type
      }))
  )

  master.onRequest('executeSupervisor', async ({ name, payload }: { name: string, payload: any }) => { 
    if(payload === undefined)
      log('supervisor', `${name}()`)
    else if(name === 'login')
      log('supervisor', `${name}(${JSON.stringify({
        ...payload,
        password: '*'.repeat(payload.password.length)
      })}`)
    else if(typeof payload === 'object')
      log('supervisor', `${name}(${JSON.stringify(payload)})`)
    else
      log('supervisor', `${name}(${payload})`)

    if(!supervisors.hasOwnProperty(name))
      throw 'Invalid supervisor name'
    
    console.log(`at ${page.url()}`)

    try {
      const value = await supervisors[name].supervisor(payload)
      log('success')
      return value
    } catch(error) {
      const errorTitle = error instanceof Error ? error.message : error.split('\n')[0]

      await page.screenshot({ 
        path: path.resolve(getEnvData().dataDir, `${new Date().getUTCFullYear()}-${new Date().getUTCMonth()+1}-${new Date().getUTCDate()}_${new Date().getUTCHours()+1}_${encodeURIComponent(errorTitle.slice(0, 20))}.png`)
      })
      log('error', errorTitle)
    }
  })
}