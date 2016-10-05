import React from 'react'
import { render } from 'react-dom'
import App from 'containers/App'
import configureStore from './store'
import { initApp } from 'api'

const store = configureStore()

function renderApp(App) {
  render(
    <App store={store} />,
    document.getElementById('app')
  )
}

initApp(store.dispatch)
  .then(_ => renderApp(App))
  .catch(e => console.error(e))
