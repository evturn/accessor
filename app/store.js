import { createStore, applyMiddleware, compose } from 'redux'
import { fromJS } from 'immutable'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { reduxObservable } from 'redux-observable'
import logger from 'redux-logger'
import createReducer from './reducers'

const sagaMiddleware = createSagaMiddleware()
const observableMiddleware = reduxObservable()
const devtools = window.devToolsExtension || (() => noop => noop)

export default function configureStore(initialState = {}, history) {
  const middlewares = [
    observableMiddleware,
    sagaMiddleware,
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
    fromJS(initialState),
    compose(...enhancers)
  )

  store.runSaga = sagaMiddleware.run
  store.asyncReducers = {} // Async reducer registry

  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
