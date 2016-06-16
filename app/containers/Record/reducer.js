import {
  LOAD_RECORDS,
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORDS_ERROR,
  SET_RECORD_ACTIVE,
  SET_BRANCH_ACTIVE,
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

    case SET_RECORD_ACTIVE:
      return Object.assign({}, state, {
        active: action.active
      })

    case SET_BRANCH_ACTIVE:
      return Object.assign({}, state, {
        branch: action.branch
      })

    default:
      return state
  }
}

export default observableReducer
