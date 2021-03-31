import getLikesButton from './selectors/getLikeButton'
import isLiked from './isLiked'
import Post from '../../types/post/Post'

export default async (post: Post) => {
  const likeButton = await getLikesButton(post)
  if(await isLiked(likeButton))
    await likeButton.click()
}