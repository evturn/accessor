import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import * as Actions from 'api/actions'
import css from './style.css'

export const Header = ({ c, user, signOut }) => {
  return (
    <div className={c('header')}>
      <div className={c('title', { shrink: user})} />
      {user
        ? <div className={c('logout')} onClick={signOut} />
        : null
      }
    </div>
  )
}

export default connect(
  state => ({
    c: classNames.bind(css),
    user: !!state.auth.user,
  }),
  Actions
)(Header)