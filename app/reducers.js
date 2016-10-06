import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import cardReducer from 'containers/Card/reducer'
import recordReducer from 'containers/Record/reducer'
import navigationReducer from 'containers/App/reducer'
import authReducer from 'containers/Login/reducer'
import authEpic from 'containers/Login/epics'
import navigationEpic from 'containers/App/epics'
import recordEpic from 'containers/Record/epics'

export const rootReducer = combineReducers({
  ...authReducer,
  ...cardReducer,
  ...navigationReducer,
  ...recordReducer,
})

export const rootEpic = combineEpics(navigationEpic, recordEpic, authEpic)