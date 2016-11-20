import React from 'react'
import Navbar from './Navbar'
import SettingsMenu from './SettingsMenu'

import css from './style.css'

export const Header = ({ authed, toggleMenu, signOut, open }) => {
  return (
    <div className={`${css.root} ${open ? css.open : ''}`}>
      <Navbar
        toggleMenu={toggleMenu}
        authed={authed} />
      <SettingsMenu
        open={open}
        authed={authed}
        toggleMenu={toggleMenu}
        signOut={signOut} />
      <div className={css.curtain} onClick={toggleMenu} />
    </div>
  )
}

export default Header