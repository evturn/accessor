import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import Redirect from 'react-router/Redirect'
import Records from 'containers/Records'
import CreateRecordModal from 'containers/CreateRecordModal'
import MenuBar from 'containers/MenuBar'
import { logout } from 'api/actions'
import css from './style.css'

class Home extends Component {

  render() {
    return (
      <div>
        <div className={css.header}>
          <div className={css.title} />
          <div className={css.logout} onClick={this.props.logout} />
        </div>
        <Records />
        <MenuBar />
        <CreateRecordModal />
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    open: state.ui.modal,
  }),
  { logout }
)(Home)
