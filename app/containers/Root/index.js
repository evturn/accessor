import React from 'react'
import { Provider } from 'react-redux'
import Router from 'react-router/BrowserRouter'
import Match from 'react-router/Match'
import App from 'containers/App'
import Auth from 'containers/Auth'
import configureStore from 'api/store'
import 'styles'
import 'sanitize.css/sanitize.css'

const Root = store => {
  return _ => (
    <Provider store={store}>
      <Router>
        <Auth>
          <Match pattern="*" component={App} />
        </Auth>
      </Router>
    </Provider>
  )
}

export default Root(configureStore())
