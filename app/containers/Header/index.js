import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import { logout } from 'api/actions'
import css from './style.css'

export const Header = ({ c, isAuthenticated, logout }) => {
  return (
    <div className={c('header')}>
      <div className={c('title', { shrink: isAuthenticated })} />
      {isAuthenticated
        ? <div className={c('logout')} onClick={logout} />
        : null
      }
    </div>
  )
}

export default connect(
  state => ({
    c: classNames.bind(css),
    isAuthenticated: !!state.auth.isAuthenticated,
  }),
  { logout }
)(Header)