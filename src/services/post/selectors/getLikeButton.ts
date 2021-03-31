import Post from '../../../types/post/Post'
import LikeButton from '../../../types/post/LikeButton'

export default async (post: Post): Promise<LikeButton> => {
  const LikeButton = await post.$('section > span')
  if(LikeButton === null)
    throw `Nie można pobrać przycisku like`

  return LikeButton
}