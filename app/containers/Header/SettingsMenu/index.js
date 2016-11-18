import React from 'react'
import ExitIcon from 'components/Icons/ExitIcon'
import css from './style.css'

export const SettingsMenu = ({ open, signOut, toggleMenu }) => {
  return (
    <div className={`${css.root} ${open ? css.open : ''}`}>
      <ul className={css.ul}>
        <li className={css.li}>
          Link accounts
        </li>
        <li className={css.li} onClick={signOut}>
          <ExitIcon />
        </li>
        <li className={css.li} onClick={toggleMenu}>
          Cancel
        </li>
      </ul>
    </div>
  )
}

export default SettingsMenu
