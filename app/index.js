import React from 'react'
import { render } from 'react-dom'
import { apiAuth } from 'api'
import Root from 'containers/Root'
import configureStore from './store'
import * as Actions from 'api/actions'

const store = configureStore()
initializeApp(store.dispatch)

render(<Root store={store} />, document.getElementById('app'))

function initializeApp(dispatch) {
  const unsubscribe = apiAuth.onAuthStateChanged(
    user => {
      dispatch(Actions.initAuth(user))
      unsubscribe()
    },
    err => console.error(err)
  )
}

