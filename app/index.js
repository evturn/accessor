import React from 'react'
import { render } from 'react-dom'
import { API } from 'api'
import Root from 'containers/Root'
import configureStore from './store'
import * as Actions from 'api/actions'

const store = configureStore()
initializeApp(store.dispatch)

render(<Root store={store} />, document.getElementById('app'))

function initializeApp(dispatch) {
  const unsubscribe = API.Auth.onAuthStateChanged(
    user => {
      unsubscribe()
      dispatch(Actions.initAuth(user))
    },
    err => console.error(err)
  )
}

