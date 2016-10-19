import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import History from 'react-history/MemoryHistory'
import Match from 'react-router/Match'
import Redirect from 'react-router/Redirect'
import Home from 'containers/Home'
import Header from 'containers/Header'
import Login from 'containers/Login'
import { init } from 'api/actions'

export class App extends Component {
  componentWillMount() {
    this.props.init()
  }

  render() {
    return (
      <div>
        <Header />
        <Match
          pattern="/login"
          component={Login} />
        <MatchWhenAuthorized
          pattern="/"
          component={Home}
          redirect={this.props.redirect}
          isAuthenticated={this.props.isAuthenticated} />
      </div>
    )
  }
}

const MatchWhenAuthorized = ({ component: C, isAuthenticated, redirect, ...rest }) => (
  <Match {...rest} render={props => isAuthenticated ? <C {...props} /> : <Redirect to={redirect} />} />
)

export default connect(
  state => ({
    ...state,
    redirect: state.auth.redirect,
    isAuthenticated: state.auth.isAuthenticated
  }),
  { init }
)(App)