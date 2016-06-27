import {
  LOAD_RECORDS,
  LOAD_RECORDS_SUCCESS,
  LOAD_RECORDS_ERROR,
  SELECT_RECORD,
  NAVIGATE_TO_ROOT,
  RECORD_HAS_CHANGED,
  RECORD_HAS_UPDATES,
  SELECT_CARD_VIEW,
  SELECT_TREE_VIEW,
} from './constants'

import {
  GET_ITEM,
  SET_ITEM,
  STORAGE_ERROR,
} from 'utils/storage'

const initialState = {
  records: false,
  flatRecords: false,
  branches: false,
  loading: false,
  error: false,
  target: false,
  cardView: true,
  treeView: false,
  status: false,
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
        status: action.status,
      })

    case STORAGE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.status,
      })

    case SELECT_RECORD:
      return Object.assign({}, state, {
        target: action.target,
      })

    case RECORD_HAS_UPDATES:
    case RECORD_HAS_CHANGED:
      return Object.assign({}, state, {
        records: action.records,
        flatRecords: action.flatRecords,
        branches: action.branches,
        status: action.status,
      })

    case NAVIGATE_TO_ROOT:
      return Object.assign({}, state, {
        target: action.target,
      })

    case SELECT_CARD_VIEW:
      return Object.assign({}, state, {
        cardView: true,
        treeView: false,
      })

    case SELECT_TREE_VIEW:
      return Object.assign({}, state, {
        cardView: false,
        treeView: true,
        target: action.target,
      })

    default:
      return state
  }
}

export default observableReducer
