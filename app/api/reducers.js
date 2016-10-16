import { combineReducers } from 'redux'
import { API } from 'api'
import * as Types from 'api/constants'

const initialData = { subtrees: [], initialized: false }
const dataReducer = (state=initialData, action) => {
  switch (action.type) {

    case Types.ASSEMBLED: {
      const { data } = action.payload
      const dataState = !!data ? data : initialData

      return Object.assign({}, state, {
        ...dataState,
        _data: dataState,
        subtrees: !state.initialized ? dataState.subtrees : state.subtrees,
        initialized: true,
      })
    }

    case Types.CREATE_SUCCESS:
    case Types.UPDATE_SUCCESS:
    case Types.DELETE_SUCCESS:
      return Object.assign({}, state, {
        ...state._data
      })

    case Types.UNAUTHORIZE:
      return initialData

    default:
      return state
  }
}

const initialUI = { modal: false, unmounted: true }
const uiReducer = (state=initialUI, action) => {
  switch(action.type) {

    case Types.UNMOUNT_MODAL:
      return Object.assign({}, state, {
        unmounted: true,
      })

    case Types.LAUNCH_MODAL:
      return Object.assign({}, state, {
        modal: true,
        unmounted: false,
      })

    case Types.CLOSE_MODAL:
      return Object.assign({}, state, {
        modal: false,
      })

    default:
      return state
  }
}

const initialAuth = { loading: false, isAuthenticated: null, redirect: '/login' }
const authReducer = (state=initialAuth, action) => {
  switch (action.type) {

    case Types.INIT:
      return Object.assign({}, state, {
        loading: true,
      })

    case Types.INIT_AUTH:
      return Object.assign({}, state, {
        isAuthenticated: action.payload.user,
        redirect: !!action.payload.user ? '/' : '/login',
      })

    case Types.LOAD_USER:
      return Object.assign({}, state, {
        redirect: false,
      })

    case Types.DELETE_NODE:
      return Object.assign({}, state, {
        redirect: action.payload.item.back,
      })

    case Types.DELETE_SUCCESS:
      return Object.assign({}, state, {
        redirect: false,
      })

    case Types.PROVIDER_SIGN_IN:
      return Object.assign({}, state, {
        loading: true,
      })

    case Types.AUTHORIZE:
      return Object.assign({}, state, {
        loading: false,
        isAuthenticated: true,
        redirect: '/',
      })

    case Types.UNAUTHORIZE:
      return Object.assign({}, state, {
        loading: false,
        isAuthenticated: false,
        redirect: '/login',
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