import React from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Redirect from 'react-router/Redirect'
import MenuBar from 'containers/MenuBar'
import css from './style.css'

export const Home = ({ user }) => {
  return (
    <div className={css.root}>
      <div>Sup dog.</div>
      <MenuBar />
    </div>
  )
}

export default connect(
  state => ({
    user: state.auth.user
  })
)(Home)
