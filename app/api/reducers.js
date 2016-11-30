import { combineReducers } from 'redux'

const authReducr = (state={user: {}, authed: false, loading: true, open: false, error: {}}, action) => {
  switch (action.type) {

    case 'STYLE_UPDATE':
    case 'AUTH_CHANGE':
      return {
        ...state,
        ...action.payload
      }

    case 'AUTH_ERROR':
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

const uiReducer = (state={option: false}, action) => {
  switch (action.type) {

    case 'SELECT_DASHBOARD_OPTION':
      return {
        option: state.option === action.payload.option
          ? false
          : action.payload.option
      }


      default:
        return state
  }
}

export default combineReducers({
  auth: authReducr,
  ui: uiReducer,
})