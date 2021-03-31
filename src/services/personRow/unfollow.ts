import getFollowButton from './selectors/getFollowButton'
import isFollowed from './isFollowed'
import PersonRow from '../../types/personRow/PersonRow'

export default async (personRow: PersonRow) => {
  if(!(await isFollowed(personRow)))
    return
  
  const followButton = await getFollowButton(personRow)
  await followButton.click()
}