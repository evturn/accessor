import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import Match from 'react-router/Match'
import Redirect from 'react-router/Redirect'
import Records from 'containers/Records'
import CreateRecordModal from 'containers/CreateRecordModal'
import MenuBar from 'containers/MenuBar'
import { logout } from 'api/actions'
import css from './style.css'

class Home extends Component {

  render() {
    return (
      <div className={css.root}>
        <Match pattern="/" component={Records} />
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
