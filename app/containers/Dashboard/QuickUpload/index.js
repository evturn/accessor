import React, { Component } from 'react'
import { connect } from 'react-redux'
import DropTarget from 'components/DropTarget'
import QuickHeader from 'components/Headers/QuickHeader'
import css from './style.css'

export class QuickUpload extends Component {
  render() {
    return (
      <DropTarget>
        <QuickHeader text='Upload' />
      </DropTarget>
    )
  }
}

export default connect(
  state => ({
    ...state
  })
)(QuickUpload)
