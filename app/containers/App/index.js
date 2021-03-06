import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'react-router/BrowserRouter'
import Match from 'react-router/Match'
import MatchWhenAuthed from './MatchWhenAuthed'
import MatchWhenUnauthed from './MatchWhenUnauthed'
import Header from 'containers/Header'
import Home from 'containers/Home'
import Login from 'containers/Login'
import LoadingIndicator from 'components/LoadingIndicator'
import { firebaseAuth, Database } from 'api'
import * as Actions from 'api/actions'
import css from './style.css'

export class App extends Component {
  constructor(props) {
    super(props)
    this.signOut = ::this.signOut
    this.createUser = ::this.createUser
    this.styleUpdate = ::this.styleUpdate
    this.loadUser = ::this.loadUser
    this.authStateChange = ::this.authStateChange
  }

  componentDidMount() {
    this.removeListener = firebaseAuth()
      .onAuthStateChanged(x => x
        ? this.loadUser(x)
        : this.authStateChange({authed: false})
      )
  }

  componentWillUnmount() {
    this.removeListener()
  }

  authStateChange(data) {
    this.props.authChange({loading: false, ...data})
  }

  loadUser(user) {
    return Database.userRef()
      .once('value')
      .then(x => x.val())
      .then(x => !!x ? x : this.createUser(user))
      .then(user => this.authStateChange({authed: true, user}))
  }

  createUser({ displayName, email, photoURL, uid }) {
    return Database.userRef()
      .update({ displayName, email, photoURL, uid })
      .then(_ => ({ displayName, email, photoURL, uid }))
  }

  signOut(router) {
    return _ => {
      firebaseAuth().signOut()
      this.props.authChange({authed: false, user: {}})
      this.styleUpdate()
      router.transitionTo('/')
    }
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
                pattern='/'
                component={Home}
                authed={authed} />
              <MatchWhenUnauthed
                pattern='/'
                component={Login}
                authed={authed} />
            </div>}
        </Router>
  }
}

export default connect(
  state => ({
    authed: state.auth.authed,
    loading: state.auth.loading,
    open: state.auth.open,
    user: state.auth.user,
  }),
  Actions
)(App)