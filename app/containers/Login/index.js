import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'components/Card'
import GoogleLogo from 'components/Icons/GoogleLogo'
import TwitterLogo from 'components/Icons/TwitterLogo'
import GithubLogo from 'components/Icons/GithubLogo'
import { signInWithPopup, promptUserWithService, link } from 'api/auth'
import { authError } from 'api/actions'
import css from './style.css'

export class Login extends Component {
  constructor(props) {
    super(props)
    this.signInWithPopup = ::this.signInWithPopup
  }

  signInWithPopup(service) {
    return _ => {
      const { error, authError } = this.props
      return error && error.credential
        ? signInWithPopup(service)
            .then(_ => link(error.credential))
            .catch(error => authError({ error }))
        : signInWithPopup(service)
            .catch(promptUserWithService)
            .then(error => authError({ error }))
    }
  }

  render() {
    const { message } = this.props.error
    return (
      <Card header="Sign In">
        <div>
          <button
            className={css.btn}
            onClick={this.signInWithPopup('google')}>
            <GoogleLogo />
          </button>
          <button
            className={css.btn}
            onClick={this.signInWithPopup('github')}>
            <GithubLogo />
          </button>
          <button
            className={css.btn}
            onClick={this.signInWithPopup('twitter')}>
            <TwitterLogo />
          </button>
          <div className={css.error}>{message}</div>
        </div>
      </Card>
    )
  }
}

export default connect(
  state => ({
    error: state.error
  }),
  { authError }
)(Login)