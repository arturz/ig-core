import FollowButton from '../../../types/personRow/FollowButton'
import PersonRow from '../../../types/personRow/PersonRow'

export default async (personRow: PersonRow): Promise<FollowButton> => {
  const followButton = await personRow.$('button')
  if(followButton === null)
    throw `"PersonRow" nie ma przycisku do obserwowania`

  return followButton
}