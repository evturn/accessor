import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingIndicator from 'components/LoadingIndicator'
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
    const { loading } = this.props
    return (
      <div className={css.root}>
        <div className={css.header}>Sign In</div>
        <div className={css.card}>
          {loading
            ? <LoadingIndicator />
            : <div>
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
          }
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    loading: state.loading
  }),
  Actions
)(Login)