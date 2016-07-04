import {
  SET_STATE_FROM_STORAGE,
  RECEIVE_RECORDS,
} from 'containers/App/constants'

const byId = (state={}, action) => {
  switch (action.type) {
    case SET_STATE_FROM_STORAGE:
    case RECEIVE_RECORDS:
      return mapRecordsById(state, action.data)

    default:
      return state
  }
}

function mapRecordsById(state, data) {
  const nextState = { ...state }

  data.forEach(x => {
    nextState[x.id] = x
  })

  return nextState
}

const branches = (state={}, action) => {
  switch (action.type) {
    case SET_STATE_FROM_STORAGE:
    case RECEIVE_RECORDS:
      return createBranches(action.data)

    default:
      return state
  }
}

function createBranches(data) {

  function getOwnAncestorIds(acc, item) {
    if (item.parent) {
      data
        .filter(x => x.id === item.parent)
        .map(x => getOwnAncestorIds(acc, x))
    }

    acc.push(item.id)
    return acc
  }

  return data
    .reduce((acc, x) => {
      acc[x.id] = getOwnAncestorIds([], x)

      return acc
    }, {})
}

export {
  byId,
  branches,
}
