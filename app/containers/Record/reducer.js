import {
  LOAD_RECORDS,
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORDS_ERROR,
  UPDATE_ACTIVE_BRANCH,
} from './constants'

const initialState = {
  active: false,
  branch: [],
  loading: false,
  error: false,
  records: false,
}

const observableReducer = (state=initialState, action) => {
  switch (action.type) {
    case LOAD_RECORDS:
      return Object.assign({}, state, {
        loading: true,
        error: false,
        records: false,
        flatRecords: false,
      })

    case LOAD_RECORDS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        flatRecords: action.flatRecords,
        records: action.records,
      })

    case LOAD_RECORDS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })

    case UPDATE_ACTIVE_BRANCH:
      return Object.assign({}, state, {
        active: action.active,
        branch: action.branch,
      })

    default:
      return state
  }
}

export default observableReducer
