import firebase from 'firebase'
import { firebaseAuth } from 'api'
import * as Types from '../../constants'

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
