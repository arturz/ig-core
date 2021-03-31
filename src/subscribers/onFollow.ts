import { onFollow } from '../emitter'

export default () => {
  onFollow.on(person => {
    console.log(`Followed person ${person.login}`)
  })
}