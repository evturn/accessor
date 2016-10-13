import React, { Component } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Link from 'react-router/Link'
import { launchModal } from 'api/actions'
import css from './style.css'

const Menu = ({ className, onClick }) => {
  return (
    <div className={className}>
      <ul className={css.ul}>
        <li className={css.li}>◉</li>
        <li className={css.lg} onClick={onClick} />
        <li className={css.li}><Link className={css.link} to="/" >⏏</Link></li>
      </ul>
    </div>
  )
}

const MenuBar = ({ launchModal, addSubRecord }) => {
  return (
    <Match pattern="/" children={({ location }) =>
      <Menu
        className={location.pathname.length > 1 ? css.view : css.main}
        onClick={launchModal} />
    } />
  )
}

export default connect(null, {
  launchModal,
})(MenuBar)