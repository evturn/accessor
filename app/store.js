import { createStore, applyMiddleware, compose } from 'redux'
import { reduxObservable } from 'redux-observable'
import logger from 'redux-logger'
import { rootReducer, rootManager } from './reducers'

const devtools = window.devToolsExtension || (() => noop => noop)

const initialState = {
  records: false,
  data: false,
  branches: false,
  loading: false,
  error: false,
  target: false,
  cardView: true,
  treeView: false,
  message: false,
}

export default function configureStore(state=initialState, history) {
  const middlewares = [
    reduxObservable(rootManager),
  ]

  __DEV__
    ? middlewares.push(logger())
    : null

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools(),
  ]

  const store = createStore(
    rootReducer,
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
