import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleLogo from './GoogleLogo'
import TwitterLogo from './TwitterLogo'
import GithubLogo from './GithubLogo'
import * as Actions from 'api/actions'
import css from './style.css'

export class Login extends Component {
  constructor(props) {
    super(props)
    this.providerSignIn = ::this.providerSignIn
  }

  providerSignIn(service) {
    return _ => this.props.signInWithProvider(service)
  }

  render() {
    return (
      <div className={css.root}>
        <div className={css.header}>Sign In</div>
        <div className={css.card}>
          <button className={css.btn} onClick={this.providerSignIn('google')}>
            <GoogleLogo />
          </button>
          <button className={css.btn} onClick={this.providerSignIn('github')}>
            <GithubLogo />
          </button>
          <button className={css.btn} onClick={this.providerSignIn('twitter')}>
            <TwitterLogo />
          </button>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state
  }),
  Actions
)(Login)