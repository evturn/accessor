import React from 'react'
import AccessorLogo from 'components/Icons/AccessorLogo'
import GearIcon from 'components/Icons/GearIcon'
import css from './style.css'

export const Navbar = ({ authed, toggleMenu }) => {
  return (
    <div className={css.root}>
      <div className={css.title}>
        <AccessorLogo />
      </div>
      {authed
        ? <div className={css.gear} onClick={toggleMenu}>
            <GearIcon />
          </div>
        : null}
    </div>
  )
}

export default Navbar