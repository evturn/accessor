import createReducer from '../reducers'

export function injectAsyncReducer(store) {
  return (name, asyncReducer) => {
    store.asyncReducers[name] = asyncReducer // eslint-disable-line
    store.replaceReducer(createReducer(store.asyncReducers))
  }
}

export function injectAsyncSagas(store) {
  return (sagas) => sagas.map(store.runSaga)
}

export function getHooks(store) {
  return {
    injectReducer: injectAsyncReducer(store),
    injectSagas: injectAsyncSagas(store),
  }
}
