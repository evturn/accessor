import {
  CREATE_RECORD,
  UPDATE_RECORD,
  SELECT_CARD_VIEW,
  SELECT_TREE_VIEW,
  LOAD_FROM_STORAGE,
  GET_STATE_FROM_STORAGE,
  SET_STATE_FROM_STORAGE,
  STORAGE_ERROR,
  POPULATE_RECORDS,
  NAVIGATE_TO_ROOT,
  TARGET_CHANGE,
} from 'containers/App/constants'

const initialState = {
  records: false,
  data: false,
  branches: false,
  loading: false,
  error: false,
  target: false,
  cardView: true,
  treeView: false,
  message: false,
}

const appReducer = (state=initialState, action) => {
  switch (action.type) {

    case LOAD_FROM_STORAGE:
      return Object.assign({}, state, {
        loading: true,
      })

    case POPULATE_RECORDS:
      return Object.assign({}, state, {
        loading: false,
        ...action.payload
      })

    case GET_STATE_FROM_STORAGE:
    case SET_STATE_FROM_STORAGE:
    case STORAGE_ERROR:
    case TARGET_CHANGE:
    case NAVIGATE_TO_ROOT:
    case CREATE_RECORD:
    case UPDATE_RECORD:
      return Object.assign({}, state, {
        ...action.payload
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
        target: false,
      })

    default:
      return state
  }
}

export default appReducer
