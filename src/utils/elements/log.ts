import withElement from '../../lib/withElement'

const logElement = withElement(function(){
  //@ts-ignore
  console.log.apply(console, arguments)
})

export default (...args: any) =>
  //@ts-ignore
  logElement(...args)