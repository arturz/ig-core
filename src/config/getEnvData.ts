import { resolve } from 'path'

const login = process.env.LOGIN || 'arturz__'

const password = process.env.PASSWORD || ''

const controlled = process.env.CONTROLLED === '1'

const headless = process.env.HEADLESS === '1'

const production = process.env.NODE_ENV === 'production'

const cookies = process.env.COOKIES 
  ? JSON.parse(process.env.COOKIES) 
  : production
    ? {}
    : process.argv[2]
      ? { sessionid: process.argv[2] }
      : {}

const dataDir = process.env.DATA_DIR || resolve(process.cwd(), 'account_data')

const device = process.env.DEVICE || 'Pixel 2'

const getEnvData = () => ({
  login,
  password,
  controlled,
  headless,
  production,
  cookies,
  dataDir,
  device
})

export default getEnvData

console.log(getEnvData())