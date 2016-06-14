import {
  SET_RECORD_ACTIVE,
} from './constants'

const initialState = {
  active: false,
  loading: false,
  error: false,
  records: false,
}

const observableReducer = (state=initialState, action) => {
  switch (action.type) {
    case SET_RECORD_ACTIVE:
      return Object.assign({}, state, {
        active: action.id
      })

    case LOAD_RECORDS:
      return Object.assign({}, state, {
        loading: true,
        error: false,
        records: false,
      })

    case LOAD_RECORDS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        records: action.records,
      })

    case LOAD_RECORDS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })

    default:
      return state
  }
}

export default observableReducer
