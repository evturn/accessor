import React, { Component } from 'react'
import { connect } from 'react-redux'
import GearIcon from 'components/Icons/GearIcon'
import ExitIcon from 'components/Icons/ExitIcon'
import AccessorLogo from 'components/Icons/AccessorLogo'
import * as Actions from 'api/actions'
import css from './style.css'

export class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {open: false}
    this.updateVisibility = ::this.updateVisibility
    this.signOut = ::this.signOut
  }

  updateVisibility() {
    this.setState({open: !this.state.open})
  }

  signOut() {
    this.updateVisibility()
    this.props.signOut()
  }

  render() {
    const { open } = this.state
    const { cx, user } = this.props
    return (
      <div className={`${css.root} ${open ? css.open : ''}`}>

        <div className={css.nav}>
          <div className={css.title}>
            <AccessorLogo />
          </div>
          {user
            ? <div className={css.settings} onClick={this.updateVisibility}>
                <GearIcon />
              </div>
            : null
          }
        </div>

        <div className={css.menu}>
          <ul className={css.ul}>
            <li className={css.li}>
              Link accounts
            </li>
            <li className={css.li} onClick={this.signOut}>
              <ExitIcon />
            </li>
            <li className={css.li} onClick={this.updateVisibility}>
              Cancel
            </li>
          </ul>
        </div>

        <div className={css.curtain} onClick={this.updateVisibility} />
      </div>
    )
  }
}

export default connect(
  state => ({
    user: !!state.auth.user,
  }),
  Actions
)(Header)