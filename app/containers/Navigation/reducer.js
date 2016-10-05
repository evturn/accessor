import { Record } from 'immutable'
import * as Types from '../../constants'
import { selectRecordsById, selectRecordsByBranches } from './selectors'

function dataReducer(state=[], action) {
  switch (action.type) {

    case Types.LOGIN_SUCCESS:
    case Types.UPDATE_SUCCESS:
      return action.payload.data

    default:
      return state
  }
}

function byIdReducer(state={}, action) {
  switch (action.type) {

    case Types.LOGIN_SUCCESS:
    case Types.UPDATE_SUCCESS:
      return selectRecordsById(action.payload.data)

    default:
      return state
  }
}

function branchesReducer(state={}, action) {
  switch (action.type) {

    case Types.LOGIN_SUCCESS:
    case Types.UPDATE_SUCCESS:
      return selectRecordsByBranches(action.payload.data)

    default:
      return state
  }
}

const UserState = new Record({
  displayName: null,
  email: null,
  photoURL: null,
  uid: null,
  providerId: null,
})

function userReducer(state= new UserState(), action) {

  switch (action.type) {
    case Types.INIT_AUTH:
      return !!action.payload

    case Types.AUTH_STATE_CHANGE:
      return action.payload.user

    default:
      return state
  }
}

function errorReducer(state=null, action) {
  switch (action.type) {

    case Types.LOGIN_ERROR:
    case Types.UPDATE_ERROR:
      return action.payload.error

    default:
      return state
  }
}

export default {
  user: userReducer,
  error: errorReducer,
  branches: branchesReducer,
  byId: byIdReducer,
  data: dataReducer,
}