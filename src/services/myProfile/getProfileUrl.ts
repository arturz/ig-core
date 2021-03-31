import getCredentials from '../../config/getCredentials'

export default () =>
  `https://www.instagram.com/${(getCredentials()).login}/`