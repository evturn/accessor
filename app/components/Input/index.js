import React, { Component } from 'react'
import { connect } from 'react-redux'
import css from './styles.css'

class Input extends Component {
  constructor(props) {
    super(props)

    this.state = {
      defaultValue: props.value || '',
      formValue: props.value || '',
    }
  }

  submit() {
    const value = this.state.formValue.trim()
    if (value !== '') {
      this.setState({defaultValue: this.state.formValue})
      this.props.onSubmit(this.state.formValue)
    } else {
      this.setState({formValue: this.state.defaultValue})
    }
  }

  edit(e) {
    if (e.charCode === 13) {
      this.input.blur()
    } else {
      this.setState({ formValue: e.target.value })
    }
  }

  getBackingInstance(input) {
    this.input = input

    if (
      this.props.on
      && this.input !== null
    ) {
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
        value={this.state.formValue}
        ref={::this.getBackingInstance}
      />
    )
  }
}

export default connect(
  state => ({
    on: state.ui.modal,
  })
)(Input)
