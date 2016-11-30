import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'components/Card'
import AuthButton from 'components/Buttons/AuthButton'
import { signInWithPopup, promptUserWithService, link } from 'api/auth'
import css from './style.css'

export class LinkAccounts extends Component {
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
            onClick={_ => console.log('google')} />
          <AuthButton
            service='twitter'
            onClick={_ => console.log('twitter')} />
          <AuthButton
            service='github'
            onClick={_ => console.log('github')} />
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
