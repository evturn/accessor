import {
  SWITCH_LAYOUT,
} from 'containers/App/constants'

const treeView = (state=false, action) => {
  switch (action.type) {
    case SWITCH_LAYOUT:
      return action.treeView

    default:
      return state
  }
}

export { treeView }
