import React, { Component } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Redirect from 'react-router/Redirect'
import Home from 'containers/Home'
import Header from 'containers/Header'
import Login from 'containers/Login'

export const App = props => {
  return (
    <div>
      <Header />
      <Match
        pattern="/login"
        component={Login} />
      <MatchWhenAuthorized
        pattern="/"
        component={Home}
        isAuthenticated={props.isAuthenticated} />
    </div>
  )
}

const MatchWhenAuthorized = ({ component: Component, isAuthenticated, ...rest }) => (
  <Match {...rest} render={
    props =>
      isAuthenticated
        ? <Component {...props} />
        : <Redirect to="/login" />
    } />
)

export default connect(
  state => ({ ...state, isAuthenticated: state.isAuthenticated })
)(App)