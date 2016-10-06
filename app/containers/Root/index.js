import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Match } from 'react-router'
import App from 'containers/App'
import './styles.css'
import 'sanitize.css/sanitize.css'

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Match pattern="*" component={App} />
      </BrowserRouter>
    </Provider>
  )
}

export default Root
