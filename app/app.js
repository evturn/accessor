import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyRouterMiddleware, Route, IndexRoute, Router, browserHistory } from 'react-router'
import useScroll from 'react-router-scroll'
import { selectTippyTop } from 'utils/scroll'
import configureStore from './store'

import App from 'containers/App'
import Card from 'containers/Card'

import styles from 'containers/App/styles.css'

const store = configureStore({
  records: false,
  data: false,
  branches: false,
  loading: false,
  error: false,
  target: false,
  cardView: true,
  treeView: false,
  message: false,
}, browserHistory)

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      render={applyRouterMiddleware(useScroll(selectTippyTop))}>
      <Route path='/' component={App}>
        <IndexRoute component={Card} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
