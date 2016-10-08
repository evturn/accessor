import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Modal from 'components/Modal'
import Input from 'components/Input'
import { createRecord, closeModal } from 'api/actions'
import css from './style.css'

export class CreateRecordModal extends Component {
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
      <Modal
        open={this.props.open}
        onClose={this.props.closeModal}>
        <Input
          className={css.input}
          onSubmit={::this.createRecord} />
        <div className={css.label} />
      </Modal>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    open: state.ui.modal,
  }),
  { createRecord, closeModal }
)(CreateRecordModal)