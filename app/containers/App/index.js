import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Header from 'containers/Header'
import Home from 'containers/Home'
import Login from 'containers/Login'
import * as Actions from 'api/actions'
import css from './style.css'

export class App extends Component {
  constructor(props) {
    super(props)
    this.updateRoute = ::this.updateRoute
  }

  componentDidMount() {
    this.updateRoute(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.updateRoute(nextProps)
    }
  }

  updateRoute(props) {
    const { pathname, locationChange } = props
    locationChange({ route: pathname })
  }

  render() {
    const { user, initialized } = this.props
    return (
      <div className={css.root}>
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