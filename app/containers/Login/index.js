import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'components/Card'
import LoadingIndicator from 'components/LoadingIndicator'
import GoogleLogo from 'components/Icons/GoogleLogo'
import TwitterLogo from 'components/Icons/TwitterLogo'
import GithubLogo from 'components/Icons/GithubLogo'
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
      <Card header="Sign In">
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
      </Card>
    )
  }
}

export default connect(
  state => ({
    loading: state.loading
  }),
  Actions
)(Login)