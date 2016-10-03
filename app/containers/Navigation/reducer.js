import * as Types from '../../constants'
import { selectRecordsById, selectRecordsByBranches } from './selectors'

function dataReducer(state=[], action) {
  switch (action.type) {

    case Types.FETCH_SUCCESS:
    case Types.UPDATE_SUCCESS:
      return action.payload.data

    default:
      return state
  }
}

function byIdReducer(state={}, action) {
  switch (action.type) {

    case Types.FETCH_SUCCESS:
    case Types.UPDATE_SUCCESS:
      return selectRecordsById(action.payload.data)

    default:
      return state
  }
}

function branchesReducer(state={}, action) {
  switch (action.type) {

    case Types.FETCH_SUCCESS:
    case Types.UPDATE_SUCCESS:
      return selectRecordsByBranches(action.payload.data)

    default:
      return state
  }
}


function loadingReducer(state=false, action) {
  switch (action.type) {

    case Types.FETCH_ALL:
      return true

    case Types.FETCH_ERROR:
    case Types.FETCH_SUCCESS:
      return false

    default:
      return state
  }
}

const users = ['ev', 'craig']
const user = users[Math.floor(Math.random() * users.length)]
function userReducer(state=user, action) {
  return state
}

function errorReducer(state=null, action) {
  switch (action.type) {

    case Types.FETCH_ERROR:
    case Types.UPDATE_ERROR:
      return action.payload.error

    default:
      return state
  }
}

export default {
  user: userReducer,
  loading: loadingReducer,
  error: errorReducer,
  branches: branchesReducer,
  byId: byIdReducer,
  data: dataReducer,
}