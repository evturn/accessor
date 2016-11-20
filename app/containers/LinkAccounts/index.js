import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'components/Card'
import AuthButton from 'components/Buttons/AuthButton'
import { signInWithPopup, promptUserWithService, link } from 'api/auth'

export class LinkAccounts extends Component {
  render() {
    const { message } = this.props
    return (
      <Card
        header="Connect accounts"
        message={message}>
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
    )
  }
}

export default connect(
  state => ({
    error: state.error
  })
)(LinkAccounts)
