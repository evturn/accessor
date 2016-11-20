import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'components/Card'
import AuthButton from 'components/Buttons/AuthButton'
import { signInWithPopup, promptUserWithService, link } from 'api/auth'
import css from './style.css'

export class LinkAccounts extends Component {
  render() {
    const { message } = this.props
    return (
      <Card header="Connect accounts">
        <div>
          <AuthButton
            service='google'
            onClick={_ => console.log('google')} />
          <AuthButton
            service='twitter'
            onClick={_ => console.log('twitter')} />
          <AuthButton
            service='github'
            onClick={_ => console.log('github')} />
          <div className={css.error}>{message}</div>
        </div>
      </Card>
    )
  }
}

export default connect(
  state => ({
    error: state.error
  })
)(LinkAccounts)
