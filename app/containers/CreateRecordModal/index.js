import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Modal from 'components/Modal'
import Input from 'components/Input'
import { createRecord, closeModal } from 'api/actions'
import css from './style.css'

export class CreateRecordModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      parent: props.parent,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { parent, open } = nextProps
    if (open) {
      this.setState({ parent })
    }
  }

  createRecord(value) {
    const { parent } = this.state
    if (value.length) {
      this.props.createRecord({
        title: value,
        parent: parent,
        back: parent ? `/records/${parent}` : '/',
        dependents: [],
        children: [],
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
          isModal={true}
          onSubmit={::this.createRecord} />
        <div className={css.label} />
      </Modal>
    )
  }
}

export default connect(
  state => ({
    open: state.ui.modal
  }),
  { createRecord, closeModal }
)(CreateRecordModal)