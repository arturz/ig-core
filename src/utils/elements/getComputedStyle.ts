import withElement from '../../lib/withElement'

export default withElement((element, prop) =>
  getComputedStyle(element)[prop]
)