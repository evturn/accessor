import {
  LOAD_RECORDS,
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORDS_ERROR,
  UPDATE_ACTIVE_BRANCH,
  MOVE_RECORD,
  SELECT_RECORD,
  LAST_TARGET,
} from './constants'

const initialState = {
  loading: false,
  error: false,
  records: false,
  branches: false,
  flatRecords: false,
  selected: [],
  target: false,
  location: false,
}

const observableReducer = (state=initialState, action) => {
  switch (action.type) {
    case LAST_TARGET:
      return Object.assign({}, state, {
        target: action.target,
      })

    case SELECT_RECORD:
      return Object.assign({}, state, {
        selected: action.selected,
        target: action.target,
      })

    case LOAD_RECORDS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        records: action.records,
        branches: action.branches,
        flatRecords: action.flatRecords,
      })

    case LOAD_RECORDS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })

    case LOAD_RECORDS:
      return Object.assign({}, state, {
        loading: true,
        error: false,
        flatRecords: false,
        records: false,
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
