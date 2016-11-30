import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import rootReducer from './reducers'

export default function configureStore() {
  const middleware = [thunkmasterFlex()]

  if (__DEV__) {
    middleware.push(logger())
  }

  return createStore(
    rootReducer,
    applyMiddleware(...middleware)
  )
}

function thunkmasterFlex() {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    return next(action)
  }
}