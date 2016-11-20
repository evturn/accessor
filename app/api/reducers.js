import { combineReducers } from 'redux'

const authReducer = (state={authed: false, loading: true, open: false}, action) => {
  switch (action.type) {

    case 'STYLE_UPDATE':
    case 'AUTH_CHANGE':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}

export default authReducer