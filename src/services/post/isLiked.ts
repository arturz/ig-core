import LikeButton from '../../types/post/LikeButton'

export default async (LikeButton: LikeButton) => {
  if(await LikeButton.$('*[class*="filled"]') !== null)
    return true

  if(await LikeButton.$('*[class*="outline"]') !== null)
    return false

  throw `Nie można sprawdzić czy post jest polubiony (czy przycisk like wciśnięty)`
}