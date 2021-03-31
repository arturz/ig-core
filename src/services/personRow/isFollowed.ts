import getComputedStyle from '../../utils/elements/getComputedStyle'
import getFollowButton from './selectors/getFollowButton'
import PersonRow from '../../types/personRow/PersonRow'

export default async (personRow: PersonRow) => {
  const followButton = await getFollowButton(personRow)
  
  const isFollowed = (await getComputedStyle(followButton, 'backgroundColor')) === 'rgba(0, 0, 0, 0)'

  return isFollowed
}