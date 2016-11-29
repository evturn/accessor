import React, { Component } from 'react'
import { connect } from 'react-redux'
import DropTarget from 'components/DropTarget'
import QuickHeader from 'components/Headers/QuickHeader'
import { firebaseStorage, firebaseAuth, firebaseDatabase } from 'api/auth'
import css from './style.css'

export class QuickUpload extends Component {
  constructor(props) {
    super(props)
    this.saveToRecord = ::this.saveToRecord
    this.linkStorageToDatabase = ::this.linkStorageToDatabase
  }

  componentDidMount() {
    const userId = firebaseAuth().currentUser.uid
    const storageRef = firebaseStorage().ref(`users/${userId}`)
    const recordsRef = firebaseDatabase().ref(`records/${userId}`)
    const recordId = recordsRef.push().key
    this.setState({ storageRef, recordsRef, recordId })
  }

  linkStorageToDatabase({ downloadURL, metadata }) {
    const { recordId, recordsRef } = this.state
    if (!!downloadURL) {
      const { contentType, timeCreated, name } = metadata
      recordsRef
        .child(recordId)
        .push({ url: downloadURL, contentType, timeCreated, name })
    }
  }

  saveToRecord(file) {
    const { storageRef } = this.state
    const ref = storageRef.child(file.name)
    const task = ref.put(file)

    task.on(firebaseStorage.TaskEvent.STATE_CHANGED, {
      next: x => this.linkStorageToDatabase(x),
      error: e => console.log(e)
    })
  }

  render() {
    return (
      <DropTarget onUpload={this.saveToRecord}>
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
