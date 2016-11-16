import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import * as Actions from 'api/actions'
import css from './style.css'

export const Header = ({ cx, user, signOut }) => {
  return (
    <div className={css.header}>
      <div className={cx('title', {shrink: user})} />
      {user
        ? <div className={css.logout} onClick={signOut} />
        : null
      }
    </div>
  )
}

export default connect(
  state => ({
    cx: classNames.bind(css),
    user: !!state.auth.user,
  }),
  Actions
)(Header)