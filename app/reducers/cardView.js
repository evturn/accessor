import {
  SWITCH_LAYOUT,
} from 'containers/App/constants'

const cardView = (state=true, action) => {
  switch (action.type) {
    case SWITCH_LAYOUT:
      return action.cardView

    default:
      return state
  }
}

export { cardView }
