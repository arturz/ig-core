import { onFailedLogin } from '../emitter'

export default () => {
  onFailedLogin.on(({ login, password }) => {
    console.log(`Can't log in (${login}, ${password})`)
  })
}