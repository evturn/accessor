import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Match } from 'react-router'
import Navigation from 'containers/Navigation'
import './styles.css'
import 'sanitize.css/sanitize.css'

const App = ({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Match pattern="*" component={Navigation} />
      </BrowserRouter>
    </Provider>
  )
}

export default App
