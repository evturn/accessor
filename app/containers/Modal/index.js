import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import Input from 'components/Input'
import * as Actions from 'api/actions'
import css from './style.css'

export class CreateRecordModal extends Component {
  constructor(props) {
    super(props)
    this.state = {parent: props.parent}
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
        nodes: [],
        children: [],
      })
      this.props.closeModal()
    }
  }

  render() {
    const { cx, open, closeModal } = this.props
    return (
      <div className={cx({show: open, hide: !open})}>
        <div className={css.bar}>
          <div className={css.close} onClick={closeModal} />
        </div>
        <div className={css.body}>
          <Input
            className={css.input}
            isModal={true}
            onSubmit={::this.createRecord} />
          <div className={css.label} />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    open: state.ui.modal,
    cx: classNames.bind(css),
  }),
  Actions
)(CreateRecordModal)