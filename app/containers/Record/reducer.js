import {
  LOAD_RECORDS,
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORDS_ERROR,
  SELECT_RECORD,
  NAVIGATE_TO_ROOT,
  RECORD_HAS_CHANGED,
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

    case RECORD_HAS_CHANGED:
      return Object.assign({}, state, {
        records: action.records,
        flatRecords: action.flatRecords,
        branches: action.branches,
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
