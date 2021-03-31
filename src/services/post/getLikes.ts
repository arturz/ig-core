import Post from '../../types/post/Post'
import LikesBox from '../../types/post/LikesBox'
import getLikesBox from './selectors/getLikesBox'
import getInnerText from '../../utils/elements/getInnerText'

export default async (post: Post): Promise<number> => {
  let likesBox: LikesBox
  try {
    likesBox = await getLikesBox(post)
  } catch(error) {
    return 0
  }

  const likesSpan = await likesBox.$('span')
  if(likesSpan !== null)
    return parseInt(
      (await getInnerText(likesSpan)).replace(/( |\.|,)/g, '')
    )

  return parseInt(
    (await getInnerText(likesBox)).replace(/( |\.|,)/g, '')
  )
}