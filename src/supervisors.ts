import { Page } from 'puppeteer'
import log from './utils/elements/log'

//navigation
import gotoIndex from './services/index/gotoIndex'
import gotoProfile from './services/myProfile/gotoProfile'
import gotoFollowing from './services/myProfile/following/gotoFollowing'
import gotoLikedBy from './services/post/gotoLikedBy'
import goBackFromLikedBy from './services/likedBy/goBack'

import getVisiblePost from './services/post/selectors/getVisiblePost'
import scrollToNextPost from './services/post/scrollToNextPost'
import getNextPost from './services/post/selectors/getNextPost'
import getLikes from './services/post/getLikes'
import likePost from './services/post/likePost'
import unlikePost from './services/post/unlikePost'
import followingBot from './controllers/followingBot'
import login from './controllers/login'
import closeDialog from './services/dialog/closeDialog'
import uploadPost from './services/uploadPost/uploadPost'
import unfollowingBot from './controllers/unfollowingBot'
import Credentials from './types/Credentials'
import challenge from './controllers/challenge'
import createDevtools from './loaders/page/createDevtools'

const navigationSupervisors = (page: Page) => ({
  gotoIndex: () =>
    gotoIndex(page),
  gotoProfile: () =>
    gotoProfile(page),
  gotoFollowing: () =>
    gotoFollowing(page),
  gotoLikedBy: async () =>
    await gotoLikedBy(await getVisiblePost(page)),
  goBackFromLikedBy: async () =>
    await goBackFromLikedBy(page)
})

const servicesSupervisors = (page: Page) => ({
  scrollToNextPost: () =>
    scrollToNextPost(page),
  getLikes: async () =>
    await getLikes(await getVisiblePost(page)),
  likePost: async () =>
    await likePost(await getVisiblePost(page)),
  unlikePost: async () =>
    await unlikePost(await getVisiblePost(page)),
  closeDialog: () =>
    closeDialog(page),
  //only works in browser (puppeteer mimits mobile device):
  //openLikesDialog: async () =>
  //  await openLikesDialog(await getVisiblePost(page)),
})

const controllersSupervisors = (page: Page) => ({
  followingBot: async (maximum: number) =>
    await followingBot(page, maximum),
  unfollowingBot: (maximum: number) =>  
    unfollowingBot(page, maximum),
  login: (credentials?: Credentials) =>
    login(page, credentials),
  challenge: (code: string) =>
    challenge(page, code)
})

const devSupervisors = (page: Page) => ({
  logVisiblePost: async () =>
    log(await getVisiblePost(page)),
  logNextPost: async () =>
    log(await getNextPost(page)),
  identity: (value?: any) =>
    value,
  throw: (error: string) => {
    if(!error)
      throw `test`

    throw `test "${error}"`
  },
  createDevtools: async () =>
    await createDevtools(page)
})

const getAllSupervisors = (page: Page) => ({
  navigation: navigationSupervisors(page),
  services: servicesSupervisors(page),
  controllers: controllersSupervisors(page),
  dev: devSupervisors(page)
})

interface Supervisors {
  [name: string]: (arg: any) => any
}
export const getSupervisors = (page: Page): Supervisors => {
  const { navigation, services, controllers, dev } = getAllSupervisors(page)

  return {
    ...navigation,
    ...services,
    ...controllers,
    ...dev
  }
}

interface SupervisorsWithTypes {
  [name: string]: {
    type: string,
    supervisor: (arg: any) => any
  }
}
export const getSupervisorsWithTypes = (page: Page): SupervisorsWithTypes => {
  return Object.entries(getAllSupervisors(page)).reduce((acc, [ type, supervisors ]) => {
    Object.entries(supervisors).forEach(([ name, supervisor ]) => {
      //@ts-ignore
      acc[name] = { type, supervisor }
    })
    
    return acc
  }, {})
}