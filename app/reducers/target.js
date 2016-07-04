import {
  SELECT_CARD_VIEW,
  SELECT_TREE_VIEW,
  NAVIGATE_TO_ROOT,
  CHANGE_TARGET,
} from 'containers/App/constants'

const initialState = {
  target: false,
  cardView: true,
  treeView: false,
}

const targetReducer = (state=initialState, action) => {
  switch(action.type) {
    case CHANGE_TARGET:
      return Object.assign({}, state, {
        // changeTarget :: id -> id

        // navigate forward
        // target = action.id

        // navigate backward
        // target = !recordById[action.id].parent ? false : recordById[action.id].parent
      })

    case NAVIGATE_TO_ROOT:
      return Object.assign({}, state, {
        target: false,
      })

    case SELECT_TREE_VIEW:
      return Object.assign({}, state, {
        cardView: false,
        treeView: true,
        target: false,
      })

    case SELECT_CARD_VIEW:
      return Object.assign({}, state, {
        cardView: true,
        treeView: false,
      })

    default:
      return state
  }
}

export default targetReducer

export const selectTarget = state => state.target
