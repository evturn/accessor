import React, { Component } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import * as labels from './constants'
import './draft/styles.css'
import css from './styles.css'

class InputEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createEmpty(),
    }
  }

  onChange(editorState) {
    this.setState({ editorState })
  }

  toggleBlockType(type) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, type))
  }

  toggleInlineStyle(style) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style))
  }

  togglePlaceholer() {
    this.refs.editor.focus()
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  render() {
    return (
      <div className={css.root}>
        <InlineControls
          editorState={this.state.editorState}
          labels={labels.inlineStyles}
          onToggle={::this.toggleInlineStyle}
        />

        <div className={css.ctrlRow}>
          <BlockControls
            editorState={this.state.editorState}
            labels={labels.insetTypes}
            onToggle={::this.toggleBlockType}
          />
          <BlockControls
            editorState={this.state.editorState}
            labels={labels.listTypes}
            onToggle={::this.toggleBlockType}
          />
        </div>

        <div
          className={css.editor}
          onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={labels.styleMap}
            editorState={this.state.editorState}
            handleKeyCommand={::this.handleKeyCommand}
            onChange={::this.onChange}
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    )
  }
}


function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return css.blockquote

    default:
      return null
  }
}

class EditorButton extends Component {
  onToggle(e) {
    e.preventDefault()
    this.props.onToggle(this.props.style)
  }

  render() {

    return (
      <span
        className={this.props.active ? `${css.styleButton} ${css.activeButton}` : css.styleButton}
        onMouseDown={::this.onToggle}>
        {this.props.label}
      </span>
    )
  }
}

const BlockControls = props => {
  const selection = props.editorState.getSelection()
  const blockType = props.editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <div className={css.controls}>
      {props.labels.map(x =>
        <EditorButton
          key={x.label}
          active={x.style === blockType}
          label={x.label}
          onToggle={props.onToggle}
          style={x.style}
        />
      )}
    </div>
  )
}

const InlineControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle()

  return (
    <div className={css.controls}>
      {props.labels.map(x =>
        <EditorButton
          key={x.label}
          active={currentStyle.has(x.style)}
          label={x.label}
          onToggle={props.onToggle}
          style={x.style}
        />
      )}
    </div>
  )
}

export default InputEditor
