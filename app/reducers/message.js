import {
  RECEIVE_RECORDS,
  STORAGE_ERROR,
  SAVE_RECORD,
} from 'containers/App/constants'

const message = (state=false, action) => {
  switch (action.type) {
    case RECEIVE_RECORDS:
    case STORAGE_ERROR:
    case SAVE_RECORD:
      return action.message

    default:
      return false
  }
}

export { message }
