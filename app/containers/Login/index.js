import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'components/Card'
import AuthButton from 'components/Buttons/AuthButton'
import { signInWithPopup, promptUserWithService, link } from 'api/auth'
import * as Actions from 'api/actions'

export class Login extends Component {
  constructor(props) {
    super(props)
    this.login = ::this.login
    this.throwError = ::this.throwError
    this.linkProviderAccounts = ::this.linkProviderAccounts
    this.requireServiceAsProvider = ::this.requireServiceAsProvider
  }

  login(service) {
    return _ => this.props.error.credential
      ? this.linkProviderAccounts(service)
      : this.requireServiceAsProvider(service)
  }

  throwError(error) {
    this.props.authError({ error })
  }

  linkProviderAccounts(service) {
    signInWithPopup(service)
      .then(_ => link(this.props.error.credential))
      .catch(this.throwError)
  }

  requireServiceAsProvider(service) {
    signInWithPopup(service)
      .catch(promptUserWithService)
      .then(this.throwError)
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