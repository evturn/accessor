import React, { Component } from 'react'
import css from './style.css'

export class DropTarget extends Component {
  constructor(props) {
    super(props)
    this.onDrop = ::this.onDrop
    this.onDragOver = ::this.onDragOver
    this.onDragEnter = ::this.onDragEnter
    this.onDragLeave = ::this.onDragLeave
  }

  state = {
    dragging: false
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onDragLeave)
    window.addEventListener('dragenter', this.onDragEnter)
    window.addEventListener('dragover', this.onDragOver)
    this.containerRef.addEventListener('dragleave', this.onDragLeave)
    window.addEventListener('drop', this.onDrop)
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onDragLeave)
    window.removeEventListener('dragenter', this.onDragEnter)
    window.addEventListener('dragover', this.onDragOver)
    this.containerRef.removeEventListener('dragleave', this.onDragLeave)
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
    this.setState({dragging: false})
    e.preventDefault()
    this.props.onDrop(e)
  }

  render() {
    const { children } = this.props
    const { dragging } = this.state
    return (
      <div className={css.root}>
        {children}
        <div
          ref={x => this.containerRef = x}
          className={`${dragging ? css.show : css.hide}`}>
          Drop to upload
        </div>
      </div>
    )
  }
}

export default DropTarget