import {
  SWITCH_LAYOUT,
  CHANGE_TARGET,
  REMOVE_RECORD,
} from 'containers/App/constants'

const target = (state=false, action) => {
  switch(action.type) {
    case SWITCH_LAYOUT:
      return false

    case CHANGE_TARGET:
      return action.target

    case REMOVE_RECORD:
      return action.data
        .filter(x => x.id === action.record.parent)[0] || false

    default:
      return state
  }
}

export { target }
