import {
  RECEIVE_RECORDS,
  STORAGE_ERROR,
  SET_STATE_FROM_STORAGE,
} from 'containers/App/constants'

const message = (state=false, action) => {
  switch (action.type) {
    case RECEIVE_RECORDS:
    case STORAGE_ERROR:
    case SET_STATE_FROM_STORAGE:
      return action.message

    default:
      return state
  }
}

export { message }
