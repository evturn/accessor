import { combineReducers } from 'redux'
import { selectDataAsList, selectRecordsAsTree, selectRecordsById, selectRecordsByBranches } from 'api/selectors'
import * as Types from 'api/constants'

const initialData = { items: [], records: [], byId: {}, branches: {} }
const dataReducer = (state=initialData, action) => {
  switch (action.type) {

    case Types.LOAD_RECORDS_SUCCESS:
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

const initialLayout= { card: true, tree: false }
const layoutReducer = (state=initialLayout, action) => {
  switch(action.type) {

    case Types.CHANGE_LAYOUT:
      return { card: !state.card, tree: !state.tree }

    default:
      return state
  }
}

const initialLocation = { pathname: '/', search: '', hash: '' }
const locationReducer = (state=initialLocation, action) => {

  switch (action.type) {

    case Types.LOCATION_CHANGE:
      return Object.assign({}, state, {
        ...action.payload.location
      })

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

const navigationReducer = (state=false, action) => {
  switch (action.type) {

    case Types.LOCATION_WILL_CHANGE:
      return !!action.payload.id

    default:
      return state
  }
}

const currentRecordReducer = (state=false, action) => {
  switch (action.type) {

    case Types.CURRENT_RECORD:
      return action.payload.record

    default:
      return state
  }
}

export default combineReducers({
  data: dataReducer,
  user: userReducer,
  loading: loadingReducer,
  location: locationReducer,
  notRoot: navigationReducer,
  target: currentRecordReducer,
  error: errorReducer,
  layout: layoutReducer,
})