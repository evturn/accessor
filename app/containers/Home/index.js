import React from 'react'
import { connect } from 'react-redux'
import css from './style.css'

export const Home = ({ user }) => {
  return (
    <div className={css.root}>
      <div>Sup dog.</div>
    </div>
  )
}

export default connect(
  state => ({
    user: state.auth.user
  })
)(Home)
