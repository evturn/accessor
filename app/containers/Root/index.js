import React from 'react'
import { Provider } from 'react-redux'
import App from 'containers/App'
import './styles.css'
import 'sanitize.css/sanitize.css'

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default Root
