import React from 'react'
import { Provider } from 'react-redux'
import Router from 'react-router/BrowserRouter'
import Match from 'react-router/Match'
import App from 'containers/App'
import 'styles'
import 'sanitize.css/sanitize.css'

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router>
        <Match pattern="*" component={App} />
      </Router>
    </Provider>
  )
}

export default Root
