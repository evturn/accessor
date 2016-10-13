import React, { Component } from 'react'
import { connect } from 'react-redux'
import css from './styles.css'

class Input extends Component {
  constructor(props) {
    super(props)

    this.state = {
      defaultValue: props.value || '',
      formValue: props.value || '',
      onSubmit: props.onSubmit,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value, onSubmit } = nextProps
    this.setState({
      defaultValue: value || '',
      formValue: value || '',
      onSubmit,
    })
  }

  submit(value) {
    const { onSubmit } = this.state
    this.setState({
      defaultValue: value,
      formValue: value,
    })
    onSubmit(value)
  }

  onKeyPress(e) {
    const { isModal } = this.props
    if (!isModal) {
      this.setState({formValue: e.target.value})
    }
    if (e.charCode === 13) {
      this.input.blur()
    }
  }

  onBlur(e) {
    if (e.target.value && e.target.value.trim() !== '') {
      ::this.submit(e.target.value.trim())
    }
  }

  getBackingInstance(input) {
    this.input = input
    if (this.props.on && this.props.isModal && this.input !== null) {
      this.input.focus()
    }
  }

  render() {
    const { isModal, className } = this.props
    const { formValue } = this.state
    const control = !isModal
      ? {value: formValue, onChange: ::this.onKeyPress}
      : {defaultValue: formValue}
    const props = {
      className,
      onBlur: ::this.onBlur,
      onKeyPress: ::this.onKeyPress,
      ref: ::this.getBackingInstance,
      type: 'text',
      ...control,
    }

    return (
      <input {...props } />
    )
  }
}

export default connect(
  state => ({
    on: state.ui.modal,
  })
)(Input)
