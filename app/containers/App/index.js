import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Header from 'containers/Header'
import Home from 'containers/Home'
import Login from 'containers/Login'
import * as API from 'api'
import * as Actions from 'api/actions'

export class App extends Component {
  constructor(props) {
    super(props)
    this.initAuth = ::this.initAuth
    this.updateRouteState = ::this.updateRouteState
  }

  componentWillMount() {
    this.initAuth()
  }

  componentDidMount() {
    this.updateRouteState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.updateRouteState(nextProps)
    }
  }

  initAuth() {
    const { initAuthState, loginError } = this.props
    API.initApp(
      user => initAuthState({ user }),
      e    => loginError({error: e.message})
    )
  }

  updateRouteState(props) {
    const { pathname, locationChange } = props
    locationChange({ route: pathname })
  }

  render() {
    const { user, initialized } = this.props
    return (
      <div>
        <Header />
        {initialized
          ? user
            ? <Match pattern="/" component={Home} />
            : <Match pattern="/" component={Login} />
          : null
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    route: state.route,
    user: state.auth.user,
    initialized: state.auth.initialized,
  }),
  Actions
)(App)