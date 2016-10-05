import React, { Component } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Redirect from 'react-router/Redirect'

import Card from 'containers/Card'
import Editor from 'containers/Editor'
import Login from 'containers/Login'
import * as Actions from './actions'
import { isAuthenticated } from './selectors'
import css from './style.css'

class Navigation extends Component {

  render() {
    return (
      <div className={css.root}>
        <Match pattern="/" component={_ => (
          this.props.authenticated
            ? <Card />
            : <Login />
        )} />
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      ...state,
      authenticated: isAuthenticated(state),
    }
  },
  Actions
)(Navigation)
