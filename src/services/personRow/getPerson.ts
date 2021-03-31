import getInnerText from '../../utils/elements/getInnerText'
import isFollowed from './isFollowed'
import isUser from './isUser'
import Person from '../../types/Person'
import PersonRow from '../../types/personRow/PersonRow'

export default async (personRow: PersonRow): Promise<Person> => {
  let [ login, description, followText ] = (await getInnerText(personRow)).split('\n')

  //person is user
  if(await isUser(personRow)){
    return {
      login,
      ...followText !== undefined && { description },
      isSelf: true,
      isFollowed: false
    }
  }

  return { 
    login, 
    ...followText !== undefined && { description },
    isSelf: false,
    isFollowed: await isFollowed(personRow)
  }
}