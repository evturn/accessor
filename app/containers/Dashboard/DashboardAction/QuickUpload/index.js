import React, { Component } from 'react'
import { connect } from 'react-redux'
import DropTarget from 'components/DropTarget'
import QuickHeader from 'components/Headers/QuickHeader'
import * as Database from 'api/database'
import css from './style.css'

export class QuickUpload extends Component {
  constructor(props) {
    super(props)
    this.onDrop = ::this.onDrop
    this.handleFile = ::this.handleFile
    this.handleStorageTask = ::this.handleStorageTask
    this.showThumbnailPreview = ::this.showThumbnailPreview
    this.onStorageTaskComplete = ::this.onStorageTaskComplete
  }

  state = {
    uploads: [],
  }

  onDrop(e) {
    Array.from(e.dataTransfer.files).map(this.handleFile)
  }

  handleFile(file) {
    const reader = new FileReader()
    reader.addEventListener('load', _ => {
      this.showThumbnailPreview({ name: file.name, src: reader.result})
      this.handleStorageTask(file)
    }, false)
    reader.readAsDataURL(file)
  }

  showThumbnailPreview(data) {
    const { uploads } = this.state
    this.setState({uploads: [data].concat(uploads)})
  }

  handleStorageTask(file) {
    const taskEvent = Database.firebaseStorage.TaskEvent.STATE_CHANGED
    const task = Database.storageRef().child(file.name).put(file)
    task.on(taskEvent, {
      next:     x => console.log((x.bytesTransferred / x.totalBytes) * 100),
      error:    e => console.log(e),
      complete: _ => this.onStorageTaskComplete(task.snapshot)
    })
  }

  onStorageTaskComplete({ downloadURL:url, metadata: { name } }) {
    const { pushKey } = this.props
    if (!!url) {
      Database.recordsRef().child(pushKey).push({ url, name })
    }
  }

  render() {
    const { uploads } = this.state
    return (
      <DropTarget onDrop={this.onDrop}>
        <QuickHeader text='Upload' />
        {uploads.map((x, i) =>
          <div key={i} className={css.preview}>
            <div
              className={css.img}
              style={{backgroundImage: `url(${x.src})`}} />
            <div className={css.name}>{x.name}</div>
          </div>)}
      </DropTarget>
    )
  }
}

export default connect(
  state => ({
    ...state
  })
)(QuickUpload)