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

const initialAuth = { loading: false, isAuthenticated: null, redirect: false }
const authReducer = (state=initialAuth, action) => {
  switch (action.type) {

    case Types.INIT_AUTH:
      return Object.assign({}, state, {
        loading: true,
        isAuthenticated: action.payload.user,
        redirect: action.payload.user,
      })

    case Types.PROVIDER_SIGN_IN:
      return Object.assign({}, state, {
        loading: true,
      })

    case Types.AUTHORIZE:
      return Object.assign({}, state, {
        loading: false,
        isAuthenticated: true,
        redirect: true,
      })

    case Types.UNAUTHORIZE:
      return Object.assign({}, state, {
        loading: false,
        isAuthenticated: false,
        redirect: false,
      })

    default:
      return state
  }
}

export default combineReducers({
  data: dataReducer,
  ui: uiReducer,
  auth: authReducer,
})