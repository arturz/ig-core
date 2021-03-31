import withElement from '../../../lib/withElement'

export default withElement((element, key) => {
  delete element.dataset[key]
})