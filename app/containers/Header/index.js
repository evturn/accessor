import React from 'react'
import HeaderNavbar from './HeaderNavbar'
import HeaderSettings from './HeaderSettings'

import css from './style.css'

export const Header = ({ authed, toggleMenu, signOut, open }) => {
  return (
    <div className={`${css.root} ${open ? css.open : ''}`}>
      <HeaderNavbar
        toggleMenu={toggleMenu}
        authed={authed} />
      <HeaderSettings
        open={open}
        authed={authed}
        toggleMenu={toggleMenu}
        signOut={signOut} />
      <div className={css.curtain} onClick={toggleMenu} />
    </div>
  )
}

export default Header