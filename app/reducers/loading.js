import {
  REQUEST_RECORDS,
  RECEIVE_RECORDS,
  STORAGE_ERROR,
} from 'containers/App/constants'

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




export { loading }
