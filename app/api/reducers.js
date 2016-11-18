import { combineReducers } from 'redux'

const authReducer = (state={}, action) => {
  switch (action.type) {

    case 'AUTHENTICATING':
      return {
        ...state,
        service: action.payload.service,
        user: false,
        initialized: false,
        error: '',
      }

    case 'LINK_PROVIDERS':
      return {
        ...state
      }

    case 'AUTH_CHANGE':
      return {
        ...state,
        user: action.payload.user,
        initialized: true,
      }

    case 'AUTH_ERROR':
      return {
        ...state,
        error: action.payload.error,
        initialized: true,
      }

    default:
      return state
  }
}

const loadingReducer = (state=false, action) => {
  switch (action.type) {

    case 'AUTHENTICATING':
      return true

    case 'AUTH_CHANGE':
      return false

    default:
      return state
  }
}

const routeReducer = (state={route: ''}, action) => {
  switch (action.type) {

    case 'LOCATION_CHANGE':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}

const uiReducer = (state={open: false}, action) => {
  switch (action.type) {

    case 'STYLE_UPDATE':
      return {
        ...state,
        ...action.payload
      }

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
  auth: authReducer,
  ui: uiReducer,
  loading: loadingReducer,
  routing: routingReducer,
})