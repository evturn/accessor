import * as API from 'api'

export const locationChange = payload => {
  return {type: 'LOCATION_CHANGE', payload}
}

export const initAuthState = payload => {
  return {type: 'INIT_AUTH_STATE', payload}
}

export const signInWithProvider = service => {
  API.signInWithProvider(service)
  return {type: 'AUTHENTICATING'}
}

export const loginSuccess = payload => {
  return {type: 'LOGIN_SUCCESS', payload}
}

export const loginError = payload => {
  return {type: 'LOGIN_ERROR', payload}
}

export const signOut = _ => {
  API.signOut()
  return {type: 'SIGNOUT'}
}

export const fetchSuccess = payload => {
  return {type: 'FETCH_SUCCESS', payload}
}

export const fetchError = payload => {
  return {type: 'FETCH_ERROR', payload}
}