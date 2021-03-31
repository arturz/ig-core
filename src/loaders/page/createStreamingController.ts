import { master } from 'fork-with-emitter'
import { Page } from 'puppeteer'

const getScreenshotTime = async (page: Page) => {
  const ts = Date.now()
  await page.screenshot({ encoding: 'base64', type: 'jpeg' })
  return Date.now() - ts
}

export default (page: Page) => {
  const _ms = getScreenshotTime(page)
  _ms.then(ms => console.log(`Screenshot took ${(ms/1000).toFixed(1)}s`))

  const stream = async () => {
    master.emit('streaming', await page.screenshot({ encoding: 'base64', type: 'jpeg' }))
  }

  let timer: null | NodeJS.Timeout = null
  return {
    async startStreaming(){
      if(timer !== null)
        return
      
      const interval = (await _ms) * 2
      timer = setInterval(stream, interval)
      console.log(`Started streaming with interval ${(interval/1000).toFixed(1)}s`)
    },
    stopStreaming(){
      if(timer === null)
        return

      clearInterval(timer)
      console.log(`Streaming stopped`)
    }
  }
}