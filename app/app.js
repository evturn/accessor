import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyRouterMiddleware, Route, IndexRoute, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import useScroll from 'react-router-scroll'
import { selectTippyTop } from 'utils/scroll'
import configureStore from './store'

import App from 'containers/App'
import Card from 'containers/Card'

import styles from 'containers/App/styles.css'

const store = configureStore({}, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      render={applyRouterMiddleware(useScroll(selectTippyTop))}>
      <Route path='/' component={App}>
        <IndexRoute component={Card} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
