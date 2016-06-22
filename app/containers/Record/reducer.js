import {
  LOAD_RECORDS,
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORDS_ERROR,
  UPDATE_ACTIVE_BRANCH,
  SELECT_RECORD,
  NAVIGATE_TO_ROOT,
} from './constants'

const initialState = {
  loading: false,
  error: false,
  records: false,
  flatRecords: false,
  branches: false,
  target: false,
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
        records: action.records,
        flatRecords: action.flatRecords,
        branches: action.branches,
      })

    case LOAD_RECORDS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })

    case SELECT_RECORD:
      return Object.assign({}, state, {
        target: action.target,
      })

    case UPDATE_ACTIVE_BRANCH:
      return Object.assign({}, state, {
        active: action.active,
        branch: action.branch,
      })

    case NAVIGATE_TO_ROOT:
      return Object.assign({}, state, {
        target: action.target,
      })

    default:
      return state
  }
}

export default observableReducer
