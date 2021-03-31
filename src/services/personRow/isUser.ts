import getCredentials from '../../config/getCredentials'
import PersonRow from '../../types/personRow/PersonRow'

export default async (personRow: PersonRow) => {
  const { login } = await getCredentials()
  return await personRow.$(`a[href*="${login}"]`) !== null
}