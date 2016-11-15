import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'components/Button'
import GoogleLogo from './GoogleLogo'
import TwitterLogo from './TwitterLogo'
import GithubLogo from './GithubLogo'
import * as Actions from 'api/actions'
import css from './style.css'

export class Login extends Component {
  constructor(props) {
    super(props)
    this.githubSignIn = ::this.githubSignIn
    this.twitterSignIn = ::this.twitterSignIn
  }

  githubSignIn() {
    this.props.authenticating('github')
  }

  twitterSignIn() {
    this.props.authenticating('twitter')
  }

  render() {
    return (
      <div className={css.root}>
        <div className={css.header}>Sign In</div>
        <div className={css.card}>
          <button className={css.btn} onClick={this.twitterSignIn}>
            <GoogleLogo />
          </button>
          <button className={css.btn} onClick={this.githubSignIn}>
            <GithubLogo />
          </button>
          <button className={css.btn} onClick={this.twitterSignIn}>
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