import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'components/Card'
import AuthButton from 'components/Buttons/AuthButton'
import * as Auth from 'api/auth'
import * as Actions from 'api/actions'

export class Login extends Component {
  constructor(props) {
    super(props)
    this.login = ::this.login
    this.throwError = ::this.throwError
    this.initProviderSignIn = ::this.initProviderSignIn
    this.linkProviderAccounts = ::this.linkProviderAccounts
  }

  login(service) {
    return _ => this.props.error.credential
      ? this.linkProviderAccounts(service)
      : this.initProviderSignIn(service)
  }

  throwError(error) {
    this.props.authError({ error })
  }

  initProviderSignIn(service) {
    Auth.signInWithPopup(service)
      .catch(e => this.throwError(Auth.promptUserWithService(e)))
  }

  linkProviderAccounts(service) {
    Auth.signInWithPopup(service)
      .then(_ => Auth.link(this.props.error.credential))
      .catch(this.throwError)
  }

  render() {
    const { message } = this.props.error
    return (
      <Card header="Sign In" message={message}>
        <AuthButton service='google' onClick={this.login('google')} />
        <AuthButton service='twitter' onClick={this.login('twitter')} />
        <AuthButton service='github' onClick={this.login('github')} />
      </Card>
    )
  }
}

export default connect(
  state => ({
    error: state.auth.error
  }),
  Actions
)(Login)