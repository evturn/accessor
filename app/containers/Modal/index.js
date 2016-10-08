import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { closeModal } from 'api/actions'
import css from './style.css'

class Modal extends Component {
  render() {
    const { c, open, closeModal } = this.props
    return (
      <div className={c({ show: open, hide: !open })}>
        <div className={c('bar')}>
          <div className={c('close')} onClick={closeModal} />
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default connect(
  state => ({
    c: classNames.bind(css),
    open: state.ui.modal,
  }),
  { closeModal }
)(Modal)