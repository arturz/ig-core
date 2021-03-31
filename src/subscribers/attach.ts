import { Page } from 'puppeteer'
import onFollow from './onFollow'
import onLikePost from './onLikePost'
import onLogin from './onLogin'
import onFailedLogin from './onFailedLogin'
import onMasterMessage from './onMasterMessage'

export default (page: Page) => {
  onFollow()
  onLikePost()
  onLogin()
  onFailedLogin()
  onMasterMessage(page)
}