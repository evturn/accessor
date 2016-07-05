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

  data.forEach(x => nextState[x.id] = x)

  return nextState
}

export default byId
