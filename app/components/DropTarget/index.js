import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firebaseStorage, firebaseAuth } from 'api/auth'
import css from './style.css'

export class DropTarget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dragging: false,
      files: [],
      uploads: [],
    }
    this.onDrop = ::this.onDrop
    this.onDragOver = ::this.onDragOver
    this.onDragEnter = ::this.onDragEnter
    this.onDragLeave = ::this.onDragLeave
    this.readFile = ::this.readFile
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onDragLeave)
    window.addEventListener('dragenter', this.onDragEnter)
    window.addEventListener('dragover', this.onDragOver)
    this.target.addEventListener('dragleave', this.onDragLeave)
    window.addEventListener('drop', this.onDrop)
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onDragLeave)
    window.removeEventListener('dragenter', this.onDragEnter)
    window.addEventListener('dragover', this.onDragOver)
    this.target.removeEventListener('dragleave', this.onDragLeave)
    window.removeEventListener('drop', this.onDrop)
  }

  onDragEnter(e) {
    this.setState({dragging: true})
    e.stopPropagation()
    e.preventDefault()
  }

  onDragOver(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  onDragLeave(e) {
    this.setState({dragging: false})
    e.stopPropagation()
    e.preventDefault()
  }

  onDrop(e) {
    e.preventDefault()
    const reader = new FileReader()
    this.setState({
      dragging: false,
      files: Array.from(e.dataTransfer.files),
    })
    this.state.files.map(this.readFile)
  }

  readFile(file) {
    const reader = new FileReader()
    console.log(file)
    reader.addEventListener('load', _ => {
      this.setState({
        uploads: this.state.uploads.concat({
          name: file.name,
          src: reader.result,
        })
      })
    firebaseStorage()
      .ref(`/user/${firebaseAuth().currentUser.uid}/${file.name}`)
      .put(file)
    }, false)
    if (file) { reader.readAsDataURL(file) }
  }

  render() {
    const { dragging, files, uploads } = this.state
    console.log(uploads)
    return (
      <div className={css.root}>
        {this.props.children}
        {uploads.map((x, i) =>
          <div key={i} className={css.preview}>
            <div
              className={css.img}
              style={{backgroundImage: `url(${x.src})`}} />
            <div className={css.name}>{x.name}</div>
          </div>
        )}
        <div
          ref={x => this.target = x}
          className={`${dragging ? css.show : css.hide}`}>
          Drop to upload
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state
  })
)(DropTarget)