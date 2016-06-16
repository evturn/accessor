import { fromJS } from 'immutable'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import observableReducer from 'containers/Record/reducer'


import { LOCATION_CHANGE } from 'react-router-redux'

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
  })
}
