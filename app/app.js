import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyRouterMiddleware, Route, IndexRoute, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import FontFaceObserver from 'fontfaceobserver'
import useScroll from 'react-router-scroll'
import configureStore from './store'

import {
  selectTippyTop
} from 'containers/App/selectors'

import App from 'containers/App'
import RecordMap from 'containers/RecordMap'

import styles from 'containers/App/styles.css'

const openSansObserver = new FontFaceObserver('Open Sans', {})
openSansObserver
  .check()
  .then(
    _ => document.body.classList.add(styles.fontLoaded),
    _ => document.body.classList.remove(styles.fontLoaded)
  )

const store = configureStore({}, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      render={applyRouterMiddleware(useScroll(selectTippyTop))}>
      <Route path='/' component={App}>
        <IndexRoute component={RecordMap} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)