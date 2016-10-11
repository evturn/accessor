import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import logger from 'redux-logger'
import rootReducer from 'api/reducers'
import rootEpic from 'api/epics'

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

  if (module.hot) {
    module.hot.accept('api/epics', _ => {
      const rootEpic = require('api/epics')
      epicMiddleware.replaceEpic(rootEpic)
    })
  }

  return store
}
