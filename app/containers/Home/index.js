import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Redirect from 'react-router/Redirect'
import Records from 'containers/Records'
import MenuBar from 'containers/MenuBar'
import css from './style.css'

class Home extends Component {
  render() {
    const { redirect } = this.props

    if (redirect) {
      return <Redirect to={redirect} />
    }

    return (
      <div className={css.root}>
        <Match
          pattern="/"
          component={Records} />
        <MenuBar />
      </div>
    )
  }
}

export default connect(
  state => ({
    redirect: state.auth.redirect
  })
)(Home)
