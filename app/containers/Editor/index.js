import React, { Component } from 'react'
import { Map } from 'immutable'
import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js'

import * as labels from './constants'

import './draft/styles.css'
import css from './styles.css'

const styleMap = {
  CODE: {
    backgroundColor: '#111111',
    fontFamily: `'Ubuntu Mono', 'Inconsolata', 'Menlo', 'Consolas', monospace`,
    fontSize: 16,
    color: '#ffe600',
    padding: 2,
  },
}

class Input extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editorState: EditorState.createEmpty(),
    }

    this.focus = () => this.refs.editor.focus()
    this.onChange = editorState => this.setState({editorState})

    this.handleKeyCommand = command => this._handleKeyCommand(command)
    this.toggleBlockType = type => this._toggleBlockType(type)
    this.toggleInlineStyle = style => this._toggleInlineStyle(style)
    this.toggleInsetType = type => this._toggleInsetType(type)
  }

  _handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    )
  }

  _toggleInsetType(insetType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        insetType
      )
    )
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    )
  }

  checkActiveState() {
    this.refs.editor.focus()
    this.placeholder = ''
  }

  getEditorStyle(editorState) {
    const contentState = editorState.getCurrentContent()
    console.log(contentState.getBlockMap().first().getType())
    return !contentState.hasText()
      && contentState.getBlockMap().first().getType() !== 'unstyled'
        ? `${css.editor} ${css.hidePlaceholder}`
        : css.editor
  }

  render() {
    const inputClass = this.getEditorStyle(this.state.editorState)

    return (
      <div className={css.root}>
        <BlockStyleControls
          editorState={this.state.editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={this.state.editorState}
          onToggle={this.toggleInlineStyle}
        />
        <InsetTypeControls
          editorState={this.state.editorState}
          onToggle={this.toggleInsetType}
        />
        <div
          className={inputClass}
          onClick={::this.checkActiveState}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder="Sup..."
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
    case 'blockquote': return css.blockquote
    default: return null
  }
}

class StyleButton extends Component {
  constructor() {
    super()
    this.onToggle = e => {
      e.preventDefault()
      this.props.onToggle(this.props.style)
    }
  }

  render() {
    return (
      <span
        className={this.props.active ? `${css.styleButton} ${css.activeButton}` : css.styleButton}
        onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    )
  }
}


const BlockStyleControls = props => {
  const { editorState } = props
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <div className={css.controls}>
      {labels.blockTypes.map(type =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  )
}

const InsetTypeControls = props => {
  const { editorState } = props
  const selection = editorState.getSelection()
  const insetType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <div className={css.controls}>
      {labels.insetTypes.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === insetType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  )
}



const InlineStyleControls = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle()

  return (
    <div className={css.controls}>
      {labels.inlineStyles.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  )
}

export default Input
