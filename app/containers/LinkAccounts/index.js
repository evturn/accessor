import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'components/Card'
import AuthButton from 'components/Buttons/AuthButton'
import * as Auth from 'api/auth'
import css from './style.css'

export class LinkAccounts extends Component {
  constructor(props) {
    super(props)
    this.linkProviderAccount = ::this.linkProviderAccount
  }

  linkProviderAccount(service) {
    return _ => Auth.linkWithPopup(service)
  }

  render() {
    const { user, error } = this.props

    return (
      <div className={css.root}>
        <div className={css.av} style={{backgroundImage: `url(${user.photoURL})`}}/>
        <Card
          header="Connect accounts"
          message={error.message}>
          <AuthButton
            service='google'
            onClick={this.linkProviderAccount('google')} />
          <AuthButton
            service='twitter'
            onClick={this.linkProviderAccount('twitter')} />
          <AuthButton
            service='github'
            onClick={this.linkProviderAccount('github')} />
        </Card>
      </div>
    )
  }
}

export default connect(
  state => ({
    error: state.auth.error,
    user: state.auth.user,
  })
)(LinkAccounts)
