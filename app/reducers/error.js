import {
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

export { error }
