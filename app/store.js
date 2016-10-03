import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import logger from 'redux-logger'
import { rootReducer, rootEpic } from './reducers'

export default function configureStore(state) {
  const middleware = [
    createEpicMiddleware(rootEpic),
  ]

  if (__DEV__) {
    middleware.push(logger())
  }

  const enhancers = [
    applyMiddleware(...middleware),
  ]

  const store = createStore(
    rootReducer,
    state,
    compose(...enhancers)
  )

  return store
}
