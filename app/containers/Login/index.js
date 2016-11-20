import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'components/Card'
import AuthButton from 'components/Buttons/AuthButton'
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
          <AuthButton
            service='google'
            onClick={this.signInWithPopup('google')} />
          <AuthButton
            service='twitter'
            onClick={this.signInWithPopup('twitter')} />
          <AuthButton
            service='github'
            onClick={this.signInWithPopup('github')} />
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