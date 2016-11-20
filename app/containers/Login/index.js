import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'components/Card'
import GoogleLogo from 'components/Icons/GoogleLogo'
import TwitterLogo from 'components/Icons/TwitterLogo'
import GithubLogo from 'components/Icons/GithubLogo'
import { signInWithPopup } from 'api/auth'
import { authError } from 'api/actions'
import css from './style.css'

export class Login extends Component {
  constructor(props) {
    super(props)
    this.signInWithPopup = ::this.signInWithPopup
  }

  signInWithPopup(service) {
    return _ => signInWithPopup(service)
      .catch(error => this.props.authError({ error }))
  }

  render() {
    const { error } = this.props
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
          <div className={css.error}>{error}</div>
        </div>
      </Card>
    )
  }
}

export default connect(
  state => ({
    error: state.error.message
  }),
  { authError }
)(Login)