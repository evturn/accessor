import { createStore, applyMiddleware, compose } from 'redux'
import { reduxObservable } from 'redux-observable'
import logger from 'redux-logger'
import createReducer from './reducers'

const observableMiddleware = reduxObservable()
const devtools = window.devToolsExtension || (() => noop => noop)

export default function configureStore(initialState={}, history) {
  const middlewares = [
    observableMiddleware,
  ]

  __DEV__
    ? middlewares.push(logger())
    : null

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools(),
  ]

  const store = createStore(
    createReducer(),
    initialState,
    compose(...enhancers)
  )

  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', _ => {
      System.import('./reducers')
        .then(reducerModule => {
          const createReducers = reducerModule.default
          const nextReducers = createReducers(store.asyncReducers)

          store.replaceReducer(nextReducers)
        })
    })
  }

  return store
}
