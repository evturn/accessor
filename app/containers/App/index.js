import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Match } from 'react-router'
import Card from 'containers/Card'
import Login from 'containers/Login'
import * as Actions from 'actions'
import { isAuthenticated } from './selectors'
import css from './style.css'

export class App extends Component {
  componentWillMount() {
    this.props.loadRecords()
  }
  render() {
    return (
      <div className={css.root}>
        <Match pattern="*" component={props => {
          return this.props.authenticated
            ? <Card />
            : <Login />
          }}
        />
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
)(App)
