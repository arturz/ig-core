import withElement from '../../../lib/withElement'

export default withElement((element, key) => 
  element.dataset[key]
)