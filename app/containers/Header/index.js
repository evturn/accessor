import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import SettingsMenu from './SettingsMenu'
import * as Actions from 'api/actions'
import css from './style.css'

export class Header extends Component {
  constructor(props) {
    super(props)
    this.toggleMenu = ::this.toggleMenu
    this.signOut = ::this.signOut
  }

  signOut() {
    this.toggleMenu()
    this.props.signOut()
  }

  toggleMenu() {
    const { open, styleUpdate } = this.props
    styleUpdate({open: !open})
  }

  render() {
    const { user, open } = this.props
    return (
      <div className={`${css.root} ${open ? css.open : ''}`}>
        <Navbar
          toggleMenu={this.toggleMenu}
          user={user} />
        <SettingsMenu
          open={open}
          toggleMenu={this.toggleMenu}
          signOut={this.signOut} />
        <div className={css.curtain} onClick={this.toggleMenu} />
      </div>
    )
  }
}

export default connect(
  state => ({
    user: !!state.auth.user,
    open: state.ui.open,
  }),
  Actions
)(Header)