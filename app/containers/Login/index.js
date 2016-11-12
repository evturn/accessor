import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from 'components/Button'
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
        <div className={css.providers}>
          <Button onClick={this.githubSignIn}>Github</Button>
          <Button onClick={this.twitterSignIn}>Twitter</Button>
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