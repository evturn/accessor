import firebase from 'firebase'
import { firebaseAuth } from 'api'
import { Record } from 'immutable'
import * as Types from 'constants'
import { FirebaseList } from 'api'

export const Task = new Record({
  completed: false,
  key: null,
  title: null
})

export const recordsList = new FirebaseList({
  onLoad: loadRecordsSuccess,
}, Task)

export const loadRecordsSuccess = data => ({
  type: Types.LOAD_RECORDS_SUCCESS,
  payload: { data }
})

export const loadRecords = _ => ({
  type: Types.LOAD_RECORDS,
  payload: {
    path: `records/ev`,
    list: recordsList,
  }
})

export const createRecord = record => ({
  type: Types.CREATE_RECORD,
  payload: { record }
})

export function createTaskError(error) {
  return {
    type: Types.CREATE_TASK_ERROR,
    payload: error
  }
}

export function createTaskSuccess(task) {
  return {
    type: Types.CREATE_TASK_SUCCESS,
    payload: task
  }
}

export const changeLayout = layout => ({
  type: Types.CHANGE_LAYOUT
})

export const logout = _ => ({
  type: Types.LOGOUT
})

export const twitterAuth = _ => ({
  type: Types.AUTHENTICATING,
  payload: { provider: new firebase.auth.TwitterAuthProvider() }
})

export const githubAuth = _ => ({
  type: Types.AUTHENTICATING,
  payload: { provider: new firebase.auth.GithubAuthProvider() }
})

export const loginSuccess = result => ({
  type: Types.LOGIN_SUCCESS,
  payload: { user: result.user }
})

export const loginError = err => ({
  type: Types.LOGIN_ERROR,
  payload: { error: err.message }
})

export const authStateChange = user => ({
  type: Types.AUTH_STATE_CHANGE,
  payload: { user: user.providerData ? user.providerData[0] : null}
})

export const initAuth = user => {
  return {
    type: Types.INIT_AUTH,
    payload: user
  }
}

export const logoutSuccess = _ => ({
  type: Types.LOGOUT_SUCCESS
})

export const locationChange = id => ({
  type: Types.LOCATION_CHANGE,
  payload: { id }
})

export const currentRecord = record => ({
  type: Types.CURRENT_RECORD,
  payload: { record }
})

export const updateRecord = record => ({
  type: Types.UPDATE_RECORD,
  payload: { record }
})

export const removeRecord = record => ({
  type: Types.REMOVE_RECORD,
  payload: { record }
})

export const fetchAll = user => ({
  type: Types.FETCH_ALL,
  payload: { user }
})

export const fetchSuccess = data => ({
  type: Types.FETCH_SUCCESS,
  payload: { data }
})

export const fetchError = e => ({
  type: Types.FETCH_ERROR,
  payload: { error: e.message }
})

export const updateSuccess = data => ({
  type: Types.UPDATE_SUCCESS,
  payload: { data }
})