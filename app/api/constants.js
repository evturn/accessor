export { EPIC_END } from 'redux-observable'
export const INIT              = 'auth/INIT'
export const INIT_AUTH         = 'auth/INIT_AUTH'
export const AUTH_STATE_CHANGE = 'auth/AUTH_STATE_CHANGE'

export const PROVIDER_SIGN_IN  = 'auth/PROVIDER_SIGN_IN'
export const PROVIDER_SIGN_OUT = 'auth/PROVIDER_SIGN_OUT'
export const UNAUTHORIZE       = 'auth/UNAUTHORIZE'

export const LOGIN_SUCCESS     = 'auth/LOGIN_SUCCESS'
export const LOGIN_ERROR       = 'auth/LOGIN_ERROR'

export const LOGOUT            = 'auth/LOGOUT'
export const LOGOUT_ERROR      = 'auth/LOGOUT_ERROR'

export const LAUNCH_MODAL      = 'ui/LAUNCH_MODAL'
export const CLOSE_MODAL       = 'ui/CLOSE_MODAL'

export const CREATE_RECORD     = 'root/CREATE_RECORD'
export const REMOVE_RECORD     = 'root/REMOVE_RECORD'
export const UPDATE_SUCCESS   = 'root/UPDATE_SUCCESS'

export const CHANGE_TARGET     = '@@accessor/Navigator/CHANGE_TARGET'

export const LOCATION_CHANGE  = 'root/LOCATION_CHANGE'
export const LOCATION_WILL_CHANGE = 'record/LOCATION_WILL_CHANGE'
export const CURRENT_RECORD   = 'record/CURRENT_RECORD'
export const UPDATE_RECORD    = 'record/UPDATE_RECORD'
export const UPDATE_ERROR     = 'root/UPDATE_ERROR'
export const CHANGE_LAYOUT    = 'card/CHANGE_LAYOUT'

export const OK_200           = 'root/OK_200'