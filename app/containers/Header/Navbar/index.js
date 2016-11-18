import React from 'react'
import { connect } from 'react-redux'
import AccessorLogo from 'components/Icons/AccessorLogo'
import GearIcon from 'components/Icons/GearIcon'
import css from './style.css'

export const Navbar = ({ user, toggleMenu }) => {
  return (
    <div className={css.root}>
      <div className={css.title}>
        <AccessorLogo />
      </div>
      {user
        ? <div className={css.gear} onClick={toggleMenu}>
            <GearIcon />
          </div>
        : null
      }
    </div>
  )
}

export default connect(
  state => ({
    ...state
  })
)(Navbar)