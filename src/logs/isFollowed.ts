import { master, isSlave } from 'fork-with-emitter'

export default async (login: string) => {
  if(!isSlave)
    return false

  await master.request('isFollowed', login)
}