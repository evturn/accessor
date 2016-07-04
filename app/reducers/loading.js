import {
  REQUEST_RECORDS,
  RECEIVE_RECORDS,
  STORAGE_ERROR,
  SET_STATE_FROM_STORAGE,
} from 'containers/App/constants'

const error = (state=false, action) => {
  switch (action.type) {
    case STORAGE_ERROR:
    case SET_STATE_FROM_STORAGE:
      return action.error

    default:
      return state
  }
}

const message = (state=false, action) => {
  switch (action.type) {
    case RECEIVE_RECORDS:
    case STORAGE_ERROR:
    case SET_STATE_FROM_STORAGE:
      return action.message

    default:
      return state
}


const loading = (state=false, action) => {
  switch (action.type) {
    case REQUEST_RECORDS:
      return true

    case STORAGE_ERROR:
    case RECEIVE_RECORDS:
      return false

    default:
      return state
  }
}


export {
  error,
  message,
  loading,
}
