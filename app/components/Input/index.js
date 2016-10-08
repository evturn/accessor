import React, { Component } from 'react'

import css from './styles.css'

class InputField extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formValue: props.value || '',
    }
  }

  submit() {
    this.props.onSubmit(this.state.formValue)
    this.setState({ formValue: '' })
    this.input.value = ''
  }

  edit(e) {
    if (e.charCode === 13) {
      this.submit()
    } else {
      this.setState({ formValue: e.target.value })
    }
  }

  getBackingInstance(input) {
    this.input = input

    if (this.input !== null && !this.props.preventAutoFocus) {
      this.input.focus()
    }
  }

  render() {
    return (
      <input
        className={this.props.className}
        onBlur={::this.submit}
        onChange={::this.edit}
        onKeyPress={::this.edit}
        defaultValue={this.state.formValue}
        ref={::this.getBackingInstance}
      />
    )
  }
}

export default InputField
