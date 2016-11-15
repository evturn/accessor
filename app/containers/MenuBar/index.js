import React, { Component } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Link from 'react-router/Link'
import Modal from 'containers/Modal'
import { launchModal } from 'api/actions'
import css from './style.css'

const Menu = ({ className, onClick }) => {
  return (
    <ul className={css.ul}>
      <li className={css.li}>◉</li>
      <li className={css.lg} onClick={onClick} />
      <li className={css.li}><Link className={css.link} to="/" >⏏</Link></li>
    </ul>
  )
}

const MenuBar = ({ launchModal, unmounted }) => {
  return (
    <Match pattern="/:route/:id" children={({ params }) => {
      return (
        <div className={params ? css.view : css.main}>
          <Menu onClick={launchModal} />
          {!unmounted ? <Modal parent={params ? params.id : false} /> : null}
        </div>
      )
    }} />
  )
}

export default connect(
  state => ({
    open: state.ui.modal,
    unmounted: state.ui.unmounted,
  }),
  { launchModal }
)(MenuBar)