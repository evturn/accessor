import { combineReducers } from 'redux'
import { selectDataAsList, selectRecordsAsTree, selectRecordsById, selectRecordsByBranches } from 'api/selectors'
import * as Types from 'api/constants'

const initialData = { items: [], records: [], byId: {}, branches: {} }
const dataReducer = (state=initialData, action) => {
  switch (action.type) {

    case Types.UPDATE_SUCCESS:
      const data = selectDataAsList(action.payload.data)

      return Object.assign({}, state, {
        items: data,
        records: selectRecordsAsTree(data),
        byId: selectRecordsById(data),
        branches: selectRecordsByBranches(data),
      })

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

const authReducer = (state=null, action) => {
  switch (action.type) {

    case Types.AUTH_STATE_CHANGE:
      return action.payload.isAuthenticated

    case Types.LOGIN_SUCCESS:
      return true

    case Types.LOGOUT_SUCCESS:
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