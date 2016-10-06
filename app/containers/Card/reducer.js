import * as Types from 'constants'
import { selectLayout } from './selectors'

const layoutReducer = (state={ card: true, tree: false }, action) => {
  switch(action.type) {

    case Types.CHANGE_LAYOUT:
      return selectLayout(state)

    default:
      return state
  }
}

export default { layout: layoutReducer }