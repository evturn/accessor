import { combineReducers } from 'redux'

const byId = (state={}, action) => {
  switch (action.type) {
    case RECEIVE_RECORDS:
      const nextState = { ...state }

      action.data.forEach(x => {
        nextState[x.id] = x
      })
      return nextState

    default:
      return state
  }
}

const branches = (state={}, action) => {
  switch (action.type) {
    case RECEIVE_RECORDS:

      function getOwnAncestorIds(acc, item) {
        if (item.parent) {
          action.data
            .filter(x => x.id === item.parent)
            .map(x => getOwnAncestorIds(acc, x))
        }

        acc.push(item.id)
        return acc
      }

      return action.data
        .reduce((acc, x) => {
          acc[x.id] = getOwnAncestorIds([], x)

          return acc
        }, {})

    default:
      return state
  }
}

export default combineReducers({
  byId,
  branches,
})
