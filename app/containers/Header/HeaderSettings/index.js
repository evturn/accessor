import React from 'react'
import Link from 'react-router/Link'
import css from './style.css'

export const HeaderSettings = ({ open, signOut, toggleMenu }) => {
  return (
    <div className={`${css.root} ${open ? css.open : ''}`}>
      <ul className={css.ul}>
        <li className={css.li} onClick={toggleMenu}>
          <Link to='/settings'>Link accounts</Link>
        </li>
        <li className={css.li} onClick={signOut}>
          Sign Out
        </li>
        <li className={css.li} onClick={toggleMenu}>
          Cancel
        </li>
      </ul>
    </div>
  )
}

export default HeaderSettings
