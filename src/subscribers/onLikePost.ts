import { onLikePost } from '../emitter'

export default () => {
  onLikePost.on(() => {
    console.log(`Liked post`)
  })
}