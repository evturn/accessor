import {
  STORAGE_ERROR,
  SAVE_RECORD,
} from 'containers/App/constants'

const error = (state=false, action) => {
  switch (action.type) {
    case STORAGE_ERROR:
    case SAVE_RECORD:
      return action.error

    default:
      return state
  }
}

export { error }
