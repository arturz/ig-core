import withElement from '../../../lib/withElement'

export default withElement((element, key, value) => {
  element.dataset[key] = value
})