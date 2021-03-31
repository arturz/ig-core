import Post from '../../types/post/Post'
import getLikesBox from '../post/selectors/getLikesBox'
import getOpenLikesDialogButton from '../post/selectors/getOpenLikesDialogButton'

export default async (post: Post) => {
  const likesBox = await getLikesBox(post)
  const openLikesDialogButton = await getOpenLikesDialogButton(likesBox)

  await openLikesDialogButton.click()
}