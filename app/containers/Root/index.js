import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'

import {
  applyRouterMiddleware,
  Route,
  IndexRoute,
  Router,
  browserHistory
} from 'react-router'
import useScroll from 'react-router-scroll'
import selectTippyTop from 'utils/scroll'

import App from 'containers/App'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router
      history={browserHistory}
      render={applyRouterMiddleware(useScroll(selectTippyTop))}>
      <Route path='/' component={App} />
    </Router>
  </Provider>
)

Root.PropTypes = {
  store: PropTypes.object.isRequired
}

export default Root
