import React from 'react'
import AccessorLogo from 'components/Icons/AccessorLogo'
import GearIcon from 'components/Icons/GearIcon'
import css from './style.css'

export const HeaderNavbar = ({ authed, toggleMenu }) => {
  return (
    <div className={css.root}>
      <div className={css.title}>
        <AccessorLogo />
      </div>
      {authed
        ? <div className={css.settings} onClick={toggleMenu}>
            <GearIcon />
          </div>
        : null}
    </div>
  )
}

export default HeaderNavbar