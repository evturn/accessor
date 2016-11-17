import { combineReducers } from 'redux'

const dataReducer = (state=false, action) => {
  switch (action.type) {
    default:
      return state
  }
}
const loadingReducer = (state=false, action) => {
  switch (action.type) {

    case 'AUTHENTICATING':
      return true

    case 'INIT_AUTH_STATE':
      return false

    default:
      return state
  }
}

const authReducer = (state={user: false, initialized: false, error: ''}, action) => {
  switch (action.type) {

    case 'AUTHENTICATING':
      return Object.assign({}, state, {
        error: '',
      })

    case 'INIT_AUTH_STATE':
      return Object.assign({}, state, {
        user: action.payload.user,
        initialized: true,
      })

    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        user: action.payload.user,
        login: state.login,
      })

    case 'LOGIN_ERROR':
      return Object.assign({}, state, {
        error: action.payload.error,
        initialized: true,
      })

    case 'SIGNOUT':
      return Object.assign({}, state, {
        user: false,
      })

    default:
      return state
  }
}

const routeReducer = (state={route: ''}, action) => {
  switch (action.type) {

    case 'LOCATION_CHANGE':
      return Object.assign({}, state, {
        ...action.payload
      })

    default:
      return state
  }
}

const uiReducer = (state=false, action) => {
  switch (action.type) {
    default:
      return state
  }
}
const routingReducer = (state=false, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  data: dataReducer,
  ui: uiReducer,
  auth: authReducer,
  routing: routingReducer,
  loading: loadingReducer,
})