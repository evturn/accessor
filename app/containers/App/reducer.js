import * as Types from 'constants'

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
  location: locationReducer,
}