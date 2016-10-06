import { Record } from 'immutable'
import * as Types from 'constants'
import { selectRecordsById, selectRecordsByBranches } from './selectors'

function dataReducer(state=[], action) {
  switch (action.type) {

    case Types.LOAD_RECORDS_SUCCESS:
    case Types.UPDATE_SUCCESS:
      return action.payload.data

    default:
      return state
  }
}

function byIdReducer(state={}, action) {
  switch (action.type) {

    case Types.LOAD_RECORDS_SUCCESS:
    case Types.UPDATE_SUCCESS:
      return selectRecordsById(action.payload.data)

    default:
      return state
  }
}

function branchesReducer(state={}, action) {
  switch (action.type) {

    case Types.LOAD_RECORDS_SUCCESS:
    case Types.UPDATE_SUCCESS:
      return selectRecordsByBranches(action.payload.data)

    default:
      return state
  }
}

const initialLocation = { pathname: '/', search: '', hash: '' }
const locationReducer = (state=initialLocation, action) => {
  const authenticated = { ...state, pathname: '/' }
  const notAuthenticated = { ...state, pathname: '/login' }
  switch (action.type) {

    case Types.LOGIN_SUCCESS:
      return authenticated

    case Types.LOGOUT_SUCCESS:
      return notAuthenticated

    case Types.AUTH_STATE_CHANGE:
      return !!action.payload.user ? authenticated : notAuthenticated

    case Types.LOCATION_CHANGE:
      return action.payload.location

    default:
      return state
  }
}

export default {
  branches: branchesReducer,
  byId: byIdReducer,
  data: dataReducer,
  location: locationReducer,
}