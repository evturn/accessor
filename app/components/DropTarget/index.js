import React, { Component } from 'react'
import { connect } from 'react-redux'
import css from './style.css'

export class DropTarget extends Component {
  constructor(props) {
    super(props)
    this.state = {dragging: false, files: []}
    this.onDrop = ::this.onDrop
    this.onDragOver = ::this.onDragOver
    this.onDragEnter = ::this.onDragEnter
    this.onDragLeave = ::this.onDragLeave
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
    this.setState({
      dragging: false,
      files: Array.from(e.dataTransfer.files),
    })
  }

  render() {
    const { dragging, files } = this.state
    return (
      <div className={css.root}>
        {this.props.children}
        {files.map((x, i) => <div key={i} className={css.header}>{x.name}</div>)}
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