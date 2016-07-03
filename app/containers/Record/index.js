import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import {
  SwitchControls,
  SwitchActions,
  SwitchDrag,
} from 'components/Switch'

import * as actions from 'containers/actions'

import {
  Input,
  InputEditor,
} from 'components/Input'

import css from './styles.css'

class Record extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expand: false,
      editing: false,
      creating: false,
      formValue: '',
      dragging: false,
    }
  }

  shouldPureComponentUpdate = shouldPureComponentUpdate

  onDragStart() {
    this.setState({
      dragging: true,
    })
  }

  onDragEnd() {
    this.setState({
      dragging: false,
    })
  }

  computeStyles(x) {
    return {
      expand: x.current
        || x.expand && x.parent
        || x.expand && x.root
          ? `${css.more} ${css.open}`
          : css.shut,
      nested: x.current
        && x.children
          ? `${css.open} ${css.nest}`
          : '',
      title: x.root
        || x.parent
          ? `${css.title} ${css.open}`
          : x.current
            ? `${css.title} ${css.open} ${css.main}`
            : css.shut
    }
  }

  toggleDescription() {
    this.setState({ expand: !this.state.expand})
  }

  edit(e) {
    if (e.charCode === 13) {
      this.submit()
    } else {
      this.setState({ formValue: e.target.value })
    }
  }

  getBackingInstance(input) {
    this.input = input
    if (this.state.updating) {
      if (this.input !== null) {
        this.input.focus()
      }
    }
  }

  creatingRecord() {
    this.setState({ creating: true })
  }

  updatingRecord() {
    this.setState({ updating: true })
  }

  submit() {
    if (this.state.formValue.length) {
      if (this.state.creating) {
        this.props.createRecord({
          parent: { ...this.props },
          record: {
            title: this.state.formValue,
            more: `I can not shut the hell about ${this.state.formValue}!`
          }
        })
      } else if (this.state.updating) {
        this.props.updateRecord({
          record: { ...this.props },
          title: this.state.formValue
        })
      }
    }

    this.setState({
      creating: false,
      updating: false,
      formValue: '',
    })
  }

  render() {
    const derived = {
      current: this.props.target.id === this.props.id,
      parent: this.props.target.id === this.props.parent,
      root: this.props.target === false && this.props.parent === false,
      expand: this.state.expand,
      children: this.props.children
    }
    const classes = this.computeStyles(derived)

    return (
      this.props.cardView
        ? <li className={css.li}>
            <InputEditor
              className={classes.title}
              onClick={::this.updatingRecord}
              updating={this.state.updating}
              _ref={::this.getBackingInstance}
              onBlur={::this.submit}
              onKeyPress={::this.edit}
              onChange={::this.edit}
              value={this.props.title}>
              <SwitchDrag
                hide={this.state.updating}
                current={derived.current}
              />
              <SwitchControls
                current={derived.current}
                expand={this.state.expand}
                toggle={::this.toggleDescription}
                id={this.props.id}
                changeTarget={::this.props.changeTarget}
                hide={this.state.updating}
              />
            </InputEditor>
            <div className={classes.expand}>
              {this.props.more}
            </div>
            <SwitchActions current={derived.current} />

            <div className={classes.nested}>
              <Input
                current={derived.current}
                onFocus={::this.creatingRecord}
                _ref={::this.getBackingInstance}
                creating={this.state.creating}
                value={this.state.formValue}
                onBlur={::this.submit}
                onKeyPress={::this.edit}
                onChange={::this.edit}
              />
              {this.props.children}
            </div>

          </li>
        : <li className={css.tree}>
            <div
              className={css.drag}
              onTouchStart={::this.onDragStart}
              onTouchEnd={::this.onDragEnd}>
              ⋯
            </div>
            <div
              className={`${css.record} ${this.state.dragging ? css.dragging : ''}`}>
              {this.props.title}
            </div>
            <div className={css.records}>{this.props.children}</div>
          </li>
    )
  }
}

Record.PropTypes = {
  title: PropTypes.string,
  more: PropTypes.string,
  id: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool
  ]),
  parent: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ]),
  branch: PropTypes.array,
  branches: PropTypes.object,
  target: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  cardView: PropTypes.bool,
  treeView: PropTypes.bool,
}


const matchStateToProps = state => ({
  branches: state.branches,
  target: state.target,
  cardView: state.cardView,
  treeView: state.treeView,
})

export default connect(matchStateToProps, actions)(Record)
