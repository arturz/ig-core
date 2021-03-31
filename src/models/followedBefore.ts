import { isSlave, master } from 'fork-with-emitter'

export const wasFollowedBefore = async ({ login }: { login: string }) => {
  if(!isSlave)
    return false

  return await master.request<boolean>('wasFollowedBefore', login)
}

export const markAsFollowed = async ({ login }: { login: string }) => {
  master.emit('markAsFollowed', login)
}