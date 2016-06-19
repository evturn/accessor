import {
  LOAD_RECORDS,
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORDS_ERROR,
  UPDATE_ACTIVE_BRANCH,
  MOVE_RECORD,
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
        recordMap: false,
      })

    case LOAD_RECORDS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        flatRecords: action.flatRecords,
        records: action.records,
        recordMap: action.recordMap,
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

    case MOVE_RECORD:
      return Object.assign({}, state, {
        records: action.records,
        flatRecords: action.flatRecords,
      })

    default:
      return state
  }
}

export default observableReducer
