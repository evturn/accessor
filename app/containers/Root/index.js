import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'

import {
  Route,
  IndexRoute,
  Router,
  browserHistory
} from 'react-router'

import App from 'containers/App'
import Editor from 'containers/Editor'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router
      history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/input" component={Editor} />
    </Router>
  </Provider>
)

Root.PropTypes = {
  store: PropTypes.object.isRequired
}

export default Root
