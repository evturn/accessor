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

    this.onChange = editorState => this.setState({editorState})

    this.handleKeyCommand = command => this._handleKeyCommand(command)
    this.toggleHeaderType = type => this._toggleHeaderType(type)
    this.toggleInlineStyle = style => this._toggleInlineStyle(style)
    this.toggleInsetType = type => this._toggleInsetType(type)
    this.toggleListType = type => this._toggleListType(type)
  }

  _handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  _toggleHeaderType(headerType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        headerType
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

  _toggleListType(listType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        listType
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

  getEditorStyle(editorState) {
    const contentState = editorState.getCurrentContent()

    return !contentState.hasText()
      && contentState.getBlockMap().first().getType() !== 'unstyled'
        ? `${css.editor} ${css.hidePlaceholder}`
        : css.editor
  }

  togglePlaceholer() {
    this.refs.editor.focus()
  }

  render() {
    const inputClass = this.getEditorStyle(this.state.editorState)

    return (
      <div className={css.root}>
        <HeaderStyleControls
          editorState={this.state.editorState}
          onToggle={this.toggleHeaderType}
        />
        <InlineStyleControls
          editorState={this.state.editorState}
          onToggle={this.toggleInlineStyle}
        />
        <InsetTypeControls
          editorState={this.state.editorState}
          onToggle={this.toggleInsetType}
        />
        <ListTypeControls
          editorState={this.state.editorState}
          onToggle={this.toggleListType}
        />
        <div
          className={inputClass}
          onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
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


const HeaderStyleControls = props => {
  const { editorState } = props
  const selection = editorState.getSelection()
  const headerType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <div className={css.controls}>
      {labels.headerTypes.map(type =>
        <StyleButton
          key={type.label}
          active={type.style === headerType}
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

const ListTypeControls = props => {
  const { editorState } = props
  const selection = editorState.getSelection()
  const listType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <div className={css.controls}>
      {labels.listTypes.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === listType}
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
