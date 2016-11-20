import React from 'react'
import { Provider } from 'react-redux'
import App from 'containers/App'
import configureStore from 'api/store'
import 'styles'
import 'sanitize.css/sanitize.css'

const Root = store => {
  return _ => (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Root(configureStore())
