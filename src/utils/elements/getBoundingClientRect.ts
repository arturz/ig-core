import withElement from '../../lib/withElement'

export default withElement(element => {
  const { bottom, height, left, right, top, width, x, y } = element.getBoundingClientRect()
  return { bottom, height, left, right, top, width, x, y }
})