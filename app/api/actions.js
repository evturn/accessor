import { Observable } from 'rxjs'
import * as Types from 'api/constants'

////////////////
// AUTH
////////////////

export const init = _ => ({
  type: Types.INIT
})

export const initAuth = user => ({
  type: Types.INIT_AUTH,
  payload: { user }
})

export const authStateChange = ({ user, isAuthenticated }) => ({
  type: Types.AUTH_STATE_CHANGE,
  payload: { user, isAuthenticated }
})

export const logout = _ => ({
  type: Types.LOGOUT
})

export const twitterAuth = _ => ({
  type: Types.PROVIDER_SIGN_IN,
  payload: { provider: 'twitter' }
})

export const githubAuth = _ => ({
  type: Types.PROVIDER_SIGN_IN,
  payload: { provider: 'github' }
})

export const loginSuccess = user => ({
  type: Types.LOGIN_SUCCESS,
  payload: { user }
})

export const loginError = err => ({
  type: Types.LOGIN_ERROR,
  payload: { error: err.message }
})

export const logoutSuccess = _ => ({
  type: Types.LOGOUT_SUCCESS
})

export const logoutError = error => ({
  type: Types.LOGOUT_ERROR,
  payload: { error }
})

export const launchModal = _ => ({
  type: Types.LAUNCH_MODAL
})

export const closeModal = _ => ({
  type: Types.CLOSE_MODAL
})

////////////////
// DATA
////////////////
export const createRecord = ({ child, data }) => ({
  type: Types.CREATE_RECORD,
  payload: { child, data }
})

export const OK200 = _ => ({
  type: Types.OK_200
})

export const removeRecord = (id, child) => ({
  type: Types.REMOVE_RECORD,
  payload: { id, child }
})

export const updateSuccess = data => ({
  type: Types.UPDATE_SUCCESS,
  payload: { data }
})

export const locationChange = id => ({
  type: Types.LOCATION_CHANGE,
  payload: { id }
})

export const changeLayout = layout => ({
  type: Types.CHANGE_LAYOUT
})

export const locationWillChange = id => ({
  type: Types.LOCATION_WILL_CHANGE,
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

////////////////
// EMPTY ACTION
////////////////
export const nothing = _ => Observable.empty()