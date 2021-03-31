import withElement from '../../lib/withElement'

export default withElement(element => {
  console.log(element)
  element.style.background = '#ff000066'
})