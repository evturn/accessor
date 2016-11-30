import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'components/Card'
import AuthButton from 'components/Buttons/AuthButton'
import * as Auth from 'api/auth'
import * as Actions from 'api/actions'
import css from './style.css'

export class Settings extends Component {
  constructor(props) {
    super(props)
    this.throwError = ::this.throwError
    this.linkAccount = ::this.linkAccount
    this.initProviderLink = ::this.initProviderLink
    this.mergeProviderAccounts = ::this.mergeProviderAccounts
  }

  linkAccount(service) {
    return _ => this.props.error.credential
      ? this.mergeProviderAccounts(service)
      : this.initProviderLink(service)
  }

  throwError(error) {
    this.props.authError({ error })
  }

  initProviderLink(service) {
    Auth.linkWithPopup(service)
      .catch(this.throwError)
  }

  mergeProviderAccounts(service) {
    return _ => Auth.signInWithCredential
  }

  render() {
    const { user, error } = this.props
    return (
      <div className={css.root}>
        <div className={css.details}>
          <div
            className={css.av}
            style={{backgroundImage: `url(${user.photoURL})`}}/>
          <div className={css.name}>{user.displayName}</div>
        </div>
        <Card header='Connect accounts' message={error.message}>
          <AuthButton service='google' onClick={this.linkAccount('google')} />
          <AuthButton service='twitter' onClick={this.linkAccount('twitter')} />
          <AuthButton service='github' onClick={this.linkAccount('github')} />
        </Card>
      </div>
    )
  }
}

export default connect(
  state => ({
    error: state.auth.error,
    user: state.auth.user,
  }),
  Actions
)(Settings)
