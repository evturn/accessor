import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Match } from 'react-router'
import Card from 'containers/Card'
import Login from 'containers/Login'
import * as Actions from 'actions'
import css from './style.css'

export class App extends Component {
  render() {
    return (
      <Router
        location={this.props.location}>
        <div className={css.root}>
          <Match pattern="/" component={Card} />
          <Match pattern="/login" exactly component={Login} />
        </div>
      </Router>
    )
  }
}

export default connect(
  state => {
    return {
      ...state
    }
  },
  Actions
)(App)
