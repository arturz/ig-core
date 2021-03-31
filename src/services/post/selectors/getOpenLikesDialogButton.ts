import LikesBox from '../../../types/post/LikesBox'
import OpenLikesDialogButton from '../../../types/likesDialog/OpenLikesDialogButton'

export default async (likesBox: LikesBox): Promise<OpenLikesDialogButton> => {
  const openLikesButton = await likesBox.$('button')
  if(openLikesButton === null)
    throw `Nie ma przycisku do otwierania dialogu z osobami, które polubiły`

  return openLikesButton
}