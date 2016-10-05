import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import cardReducer from 'containers/Card/reducer'
import navigationReducer from 'containers/Navigation/reducer'
import apiAuthReducer from 'containers/Login/reducer'
import apiAuthEpic from 'containers/Login/epics'
import recordReducer from 'containers/Record/reducer'
import navigationEpic from 'containers/Navigation/epics'
import recordEpic from 'containers/Record/epics'

export const rootReducer = combineReducers({
  ...apiAuthReducer,
  ...cardReducer,
  ...navigationReducer,
  ...recordReducer,
})

export const rootEpic = combineEpics(navigationEpic, recordEpic, apiAuthEpic)