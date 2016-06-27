import { fromJS } from 'immutable'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { LOCATION_CHANGE } from 'react-router-redux'

import { storageReducer } from 'utils/storage'

import observableReducer from 'containers/Record/reducer'

function routeReducer(state={
  locationBeforeTransitions: null
}, action) {
  switch (action.type) {

    case LOCATION_CHANGE:
      return Object.assign({}, state, {
        locationBeforeTransitions: action.payload,
      })

    default:
      return state
  }
}

export default function createReducer() {
  return combineReducers({
    global: observableReducer,
    routing: routeReducer,
    storage: storageReducer,
  })
}
