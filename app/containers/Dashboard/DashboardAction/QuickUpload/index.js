import React, { Component } from 'react'
import { connect } from 'react-redux'
import DropTarget from 'components/DropTarget'
import QuickHeader from 'components/Headers/QuickHeader'
import * as Database from 'api/database'
import css from './style.css'

export class QuickUpload extends Component {
  constructor(props) {
    super(props)
    this.onUpload = ::this.onUpload
    this.onUploadComplete = ::this.onUploadComplete
  }

  onUpload(file) {
    const task = Database.storageRef().child(file.name).put(file)
    const event = Database.firebaseStorage.TaskEvent.STATE_CHANGED

    task.on(event, {
      next:     x => console.log((x.bytesTransferred / x.totalBytes) * 100),
      error:    e => console.log(e),
      complete: _ => this.onUploadComplete(task.snapshot)
    })
  }

  onUploadComplete({ downloadURL, metadata }) {
    if (!!downloadURL) {
      const { contentType, timeCreated, name } = metadata
      Database.recordsRef()
        .child(this.props.pushKey)
        .push({url: downloadURL, contentType, timeCreated, name})
    }
  }

  render() {
    return (
      <DropTarget onUpload={this.onUpload}>
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
