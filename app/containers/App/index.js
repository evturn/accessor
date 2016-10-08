import React, { Component } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Link from 'react-router/Link'
import Redirect from 'react-router/Redirect'
import Router from 'react-router/BrowserRouter'

import Home from 'containers/Home'
import Login from 'containers/Login'
import * as Actions from 'api/actions'
import css from './style.css'

export class App extends Component {
  render() {
    return (
      <Router>
        <div className={css.root}>
          <Match
            pattern="/login"
            component={Login}
            isAuthenticated={this.props.isAuthenticated} />
          <MatchWhenAuthorized
            pattern="/"
            component={Home}
            isAuthenticated={this.props.isAuthenticated} />
        </div>
      </Router>
    )
  }
}

const MatchWhenAuthorized = ({ component: Component, isAuthenticated, ...rest }) => (
  <Match {...rest} render={props =>
    isAuthenticated
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
  } />
)


export default connect(
  state => ({
    ...state,
    isAuthenticated: state.isAuthenticated
  }),
  Actions
)(App)