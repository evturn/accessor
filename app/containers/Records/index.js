import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router/Redirect'
import classNames from 'classnames/bind'
import Modal from 'components/Modal'
import MenuBar from 'containers/MenuBar'
import InputField from 'components/Input'
import * as Actions from 'api/actions'
import css from './style.css'

class Records extends Component {
  constructor(props) {
    super(props)
  }

  createRecord(value) {
    if (value.length) {
      this.props.createRecord({
        path: `records/${this.props.user.id}`,
        data: {
          title: value,
          parent: false,
        }
      })
      this.props.closeModal()
    }
  }

  render() {
    return (
      <div>
        <div className={css.header}>
          <div className={css.title} />
          <div className={css.logout} onClick={this.props.logout} />
        </div>
        <div className={css.content}>
        {this.props.records
          ? this.props.records.map((x, i) => <div className={css.record} key={i}>{x.title}</div>)
          : null
        }
        </div>
        <MenuBar />
        <Modal
          open={this.props.open}
          onClose={this.props.closeModal}>
          <InputField
            className={css.input}
            onSubmit={::this.createRecord} />
          <div className={css.label} />
        </Modal>
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    records: state.data.records,
    open: state.ui.modal,
  }),
  Actions
)(Records)
