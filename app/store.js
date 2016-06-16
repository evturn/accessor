import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { reduxObservable } from 'redux-observable'
import logger from 'redux-logger'
import createReducer from './reducers'

const observableMiddleware = reduxObservable()
const devtools = window.devToolsExtension || (() => noop => noop)

export default function configureStore(initialState = {}, history) {
  const middlewares = [
    observableMiddleware,
    routerMiddleware(history),
  ]

  if (__DEV__) {
    middlewares.push(logger())
  }

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools(),
  ]

  const store = createStore(
    createReducer(),
    initialState,
    compose(...enhancers)
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
