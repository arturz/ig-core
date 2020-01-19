export default () => ({
  login: process.env.LOGIN ? process.env.LOGIN : 'jaca7_',
  password: process.env.PASSWORD ? process.env.PASSWORD : '',
  controlled: process.env.CONTROLLED === '1' ? true : false,
  headless: process.env.HEADLESS === '1' ? true : false
})