import 'babel-polyfill'

import 'file?name=[name].[ext]!./favicon.ico'
import 'file?name=[name].[ext]!./manifest.json'
import 'file?name=[name].[ext]!./.htaccess'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyRouterMiddleware, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import FontFaceObserver from 'fontfaceobserver'
import useScroll from 'react-router-scroll'
import configureStore from './store'
import fetch from './utils/fetch'

import {
  selectLocationState,
  selectTippyTop,
  selectOhFuck,
} from 'containers/App/selectors'

import App from 'containers/App'
import createRoutes from './routes'

import styles from 'containers/App/styles.css'

const openSansObserver = new FontFaceObserver('Open Sans', {})
openSansObserver
  .check()
  .then(
    _ => document.body.classList.add(styles.fontLoaded),
    _ => document.body.classList.remove(styles.fontLoaded)
  )

const locationSelector = {
  selectLocationState: selectLocationState()
}

const initializeStore = initialState => (
  configureStore(initialState, browserHistory)
)

const configureHistory = store => (
  syncHistoryWithStore(
    browserHistory,
    store,
    locationSelector
  )
)

const setRootRoute = store => ({
  component: App,
  childRoutes: createRoutes(store)
})

const fetchJSON = _ => {
  fetch('/api')
    .then(initializeStore)
    .then(store => render(store, configureHistory(store), setRootRoute(store)))
    .catch(selectOhFuck)
}

function render(store, history, rootRoute) {
  ReactDOM.render(
    <Provider store={store}>
      <Router
        history={history}
        routes={rootRoute}
        render={applyRouterMiddleware(useScroll(selectTippyTop))}
      />
    </Provider>,
    document.getElementById('app')
  )
}

fetchJSON()

import { install } from 'offline-plugin/runtime'
install()
