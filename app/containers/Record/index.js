import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import {
  SwitchControls,
  SwitchActions,
  SwitchDrag,
} from 'components/Switch'

import {
  recordSelected,
  recordHasChanged,
  recordHasUpdates,
} from 'containers/actions'

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
      updating: false,
      formValue: '',
      dragging: false,
    }
  }

  shouldPureComponentUpdate = shouldPureComponentUpdate

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
    e.charCode === 13
      ? this.submit()
      : this.setState({
          formValue: e.target.value
        })
  }

  getBackingInstance(input) {
    this['😵'] = input

    this['😵'] !== null
      ? this['😵'].focus()
      : null
  }

  createNewRecord() {
    this.setState({ editing: true })
  }

  updateRecord() {
    this.setState({ updating: true })
  }

  submit() {
    if (this.state.formValue.length) {
      this.state.editing
        ? this.props.recordHasChanged({
            parent: { ...this.props },
            record: {
              title: this.state.formValue,
              more: `I can not shut the hell about ${this.state.formValue}!`
            }
          })
        : this.state.updating
          ? this.props.recordHasUpdates({
              record: { ...this.props },
              title: this.state.formValue
            })
          : null
    }

    this.setState({
      editing: false,
      updating: false,
      formValue: '',
    })
  }

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
              updateRecord={::this.updateRecord}
              active={this.state.updating}
              getBackingInstance={::this.getBackingInstance}
              submit={::this.submit}
              edit={::this.edit}
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
                recordSelected={::this.props.recordSelected}
                hide={this.state.updating}
              />
            </InputEditor>
            <div className={classes.expand}>
              {this.props.more}
            </div>
            <SwitchActions
              current={derived.current}
              createNewRecord={::this.createNewRecord}
            />
            <div className={classes.nested}>
              <Input
                active={this.state.editing}
                getBackingInstance={::this.getBackingInstance}
                submit={::this.submit}
                edit={::this.edit}
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
  active: PropTypes.number,
  branches: PropTypes.object,
  recordSelected: PropTypes.func,
  target: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  cardView: PropTypes.bool,
  treeView: PropTypes.bool,
}

const mapDispatchToProps = dispatch => ({
  recordSelected: id => dispatch(recordSelected(id)),
  recordHasChanged: ({ parent, record }) => dispatch(recordHasChanged({ parent, record })),
  recordHasUpdates: ({ record, title }) => dispatch(recordHasUpdates({ record, title })),
})

export default connect(
  ({ global }) => ({
    active: global.active,
    branches: global.branches,
    target: global.target,
    cardView: global.cardView,
    treeView: global.treeView,
  }),
  mapDispatchToProps
)(Record)
