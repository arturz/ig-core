import { onLogin } from '../emitter'

export default () => {
  onLogin.on(({ login }) => {
    console.log(`Logged in (${login})`)
  })
}