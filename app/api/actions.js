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

export const authStateChange = user => ({
  type: Types.AUTH_STATE_CHANGE,
  payload: { user }
})

export const logout = _ => ({
  type: Types.PROVIDER_SIGN_OUT
})

export const unauthorize = _ => ({
  type: Types.UNAUTHORIZE
})

export const authorize = _ => ({
  type: Types.AUTHORIZE
})

export const twitterAuth = _ => ({
  type: Types.PROVIDER_SIGN_IN,
  payload: { provider: 'twitter' }
})

export const githubAuth = _ => ({
  type: Types.PROVIDER_SIGN_IN,
  payload: { provider: 'github' }
})

export const loginError = err => ({
  type: Types.LOGIN_ERROR,
  payload: { error: err.message }
})

export const logoutError = error => ({
  type: Types.LOGOUT_ERROR,
  payload: { error }
})

export const loadUser = _ => ({
  type: Types.LOAD_USER
})

export const createUser = _ => ({
  type: Types.CREATE_USER
})

////////////////
// DATA
////////////////
export const assembleData = data => ({
  type: Types.ASSEMBLE_DATA,
  payload: { data }
})

export const assembled = data => ({
  type: Types.ASSEMBLED,
  payload: { data }
})

export const createRecord = data => ({
  type: Types.CREATE_RECORD,
  payload: { data }
})

export const createSuccess = _ => ({
  type: Types.CREATE_SUCCESS
})

export const deleteNode = item => {
  return {
    type: Types.DELETE_NODE,
    payload: { item }
  }
}

export const deleteSuccess = _ => ({
  type: Types.DELETE_SUCCESS
})

export const updateItem = item => ({
  type: Types.UPDATE_ITEM,
  payload: { item }
})

export const updateSuccess = data => ({
  type: Types.UPDATE_SUCCESS,
  payload: { data }
})

////////////////
// UI
////////////////
export const navigate = history => ({
  type: Types.NAVIGATE,
  payload: { ...history }
})
export const sortEnd = data => ({
  type: Types.SORT_END,
  payload: { data }
})
export const launchModal = _ => ({
  type: Types.LAUNCH_MODAL
})

export const closeModal = _ => ({
  type: Types.CLOSE_MODAL
})

export const unmountModal = _ => ({
  type: Types.UNMOUNT_MODAL
})

export const renderInput = _ => ({
  type: Types.RENDER_INPUT
})