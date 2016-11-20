import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Router from 'react-router/BrowserRouter'
import Match from 'react-router/Match'
import Miss from 'react-router/Miss'
import MatchWhenAuthed from 'containers/MatchWhenAuthed'
import MatchWhenUnauthed from 'containers/MatchWhenUnauthed'
import Header from 'containers/Header'
import Dashboard from 'containers/Dashboard'
import Login from 'containers/Login'
import LoadingIndicator from 'components/LoadingIndicator'
import { firebaseAuth } from 'api/auth'
import * as Actions from 'api/actions'
import css from './style.css'

export class App extends Component {
  constructor(props) {
    super(props)
    this.signOut = ::this.signOut
    this.styleUpdate = ::this.styleUpdate
  }

  componentDidMount() {
    this.removeListener = firebaseAuth()
      .onAuthStateChanged(user => user
        ? this.props.authChange({loading: false, authed: true})
        : this.props.authChange({loading: false})
      )
  }

  componentWillUnmount() {
    this.removeListener()
  }

  signOut(router) {
    return _ =>
      firebaseAuth().signOut()
      this.props.authChange({authed: false})
      this.styleUpdate()
      router.transitionTo('/')
  }

  styleUpdate() {
    this.props.styleUpdate({open: !this.props.open})
  }

  render() {
    const { authed, loading, open } = this.props
    return loading === true
      ? <LoadingIndicator />
      : <Router>
          {({ router }) =>
            <div className={css.root}>
              <Header
                open={open}
                signOut={this.signOut(router)}
                toggleMenu={this.styleUpdate}
                authed={authed} />
              <MatchWhenAuthed
                pattern="/"
                component={Dashboard}
                authed={authed} />
              <MatchWhenUnauthed
                pattern="/"
                component={Login}
                authed={authed} />
              <Miss render={_ => <h3>The fuck are you going?</h3>} />
            </div>
          }
        </Router>
  }
}

export default connect(
  state => ({
    authed: state.authed,
    loading: state.loading,
    open: state.open,
  }),
  Actions
)(App)