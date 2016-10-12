import { combineReducers } from 'redux'
import * as Types from 'api/constants'

const initialData = { items: [] }
const dataReducer = (state=initialData, action) => {
  switch (action.type) {

    case Types.UPDATE_SUCCESS:
      const data = action.payload.data
      return !!data
        ? Object.assign({}, state, {...data})
        : initialData

    case Types.UNAUTHORIZE:
      return initialData

    default:
      return state
  }
}

const initialUI = { modal: false }
const uiReducer = (state=initialUI, action) => {
  switch(action.type) {

    case Types.LAUNCH_MODAL:
      return Object.assign({}, state, { modal: true })

    case Types.CLOSE_MODAL:
      return Object.assign({}, state, { modal: false })

    default:
      return state
  }
}

const loadingReducer  = (state=false, action) => {
  switch (action.type) {

    case Types.PROVIDER_SIGN_IN:
    case Types.INIT_AUTH:
      return true

    case Types.EPIC_END:
    case Types.LOGIN_ERROR:
    case Types.UNAUTHORIZE:
    case Types.UPDATE_SUCCESS:
      return false

    default:
      return state
  }
}

function userReducer(state=null, action) {
  switch (action.type) {

    case Types.UNAUTHORIZE:
      return null

    case Types.INIT_AUTH:
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

const authReducer = (state=null, action) => {
  switch (action.type) {

    case Types.INIT_AUTH:
    case Types.AUTH_STATE_CHANGE:
      return !!action.payload.user

    case Types.UNAUTHORIZE:
      return false

    default:
      return state
  }
}

export default combineReducers({
  isAuthenticated: authReducer,
  data: dataReducer,
  user: userReducer,
  loading: loadingReducer,
  error: errorReducer,
  ui: uiReducer,
})