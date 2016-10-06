import { Record } from 'immutable'
import * as Types from 'constants'

const loadingReducer  = (state=false, action) => {
  switch (action.type) {
    case Types.AUTHENTICATING:
      return true

    case Types.LOGIN_ERROR:
    case Types.LOGIN_SUCCESS:
      return false

    default:
      return state
  }
}

const AuthState = new Record({
  authenticated: false,
  id: null
})


const authReducer = (state = new AuthState(), action) => {
  switch (action.type) {

    case Types.AUTH_STATE_CHANGE:
      return {
        id: action.payload.user ? action.payload.user.uid : null,
        authenticated: !!action.payload.user,
      }

    case Types.LOGOUT_SUCCESS:
      return new AuthState()

    default:
      return state
  }
}

export default {
  loading: loadingReducer,
  auth: authReducer,
}