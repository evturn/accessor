import React from 'react'
import { render } from 'react-dom'
import Root from 'containers/Root'
import configureStore from './store'
import { init } from 'api'

const store = configureStore()

const renderApp = _ => {
  render(
    <Root store={store} />,
    document.getElementById('app')
  )
}

init(store.dispatch, renderApp)