import React from 'react'
import { render } from 'react-dom'
import { apiAuth } from 'api'
import Root from 'containers/Root'
import configureStore from './store'
import * as Actions from 'actions'

function initializeApp(Root, store) {
  const unsubscribe = apiAuth.onAuthStateChanged(
    user => {
      store.dispatch(Actions.initAuth(user))
      unsubscribe()
      render(<Root store={store} />, document.getElementById('app'))
    },
    err => observer.error(err)
  )
}

const store = configureStore()
initializeApp(Root, store)

