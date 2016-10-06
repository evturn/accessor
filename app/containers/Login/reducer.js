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

function userReducer(state=null, action) {
  switch (action.type) {

    case Types.LOGOUT_SUCCESS:
      return null

    case Types.LOGIN_SUCCESS:
    case Types.AUTH_STATE_CHANGE:
      return action.payload.user

    default:
      return state
  }
}

function errorReducer(state=null, action) {
  switch (action.type) {

    case Types.LOGIN_ERROR:
    case Types.LOGOUT_ERROR:
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
}