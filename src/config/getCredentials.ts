import getEnvData from './getEnvData'

export default () => {
  const { login, password } = getEnvData()
  return {
    login,
    password
  }
}