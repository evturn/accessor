import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import {
  SwitchControls,
  SwitchActions,
  SwitchDrag,
} from 'components/Switch'

import * as actions from 'containers/actions'

import InputField from 'components/Input'

import css from './styles.css'

class Record extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expand: false,
      editing: false,
      creating: false,
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

  creatingRecord() {
    this.setState({ creating: true })
  }

  updatingRecord() {
    this.setState({ updating: true })
  }

  submitNewRecord(value) {
    if (value.length) {
      this.props.createRecord({
        parent: { ...this.props },
        record: {
          title: value,
          more: `I can not shut the hell about ${value}!`
        }
      })
    }

    this.setState({ creating: false })
  }

  submitUpdatedRecord(value) {
    if (value.length) {
      this.props.updateRecord({
        record: { ...this.props },
        title: value
      })
    }

    this.setState({ updating: false })
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
            <div className={classes.title}>

              {this.state.updating
                ? <InputField
                    className={`${css.editor} ${classes.title}`}
                    submit={::this.submitUpdatedRecord}
                    value={this.props.title}
                  />
                : <span
                    className={css.text}
                    onClick={::this.updatingRecord}>
                    {this.props.title}
                  </span>
              }

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

            </div>

            <div className={classes.expand}>
              {this.props.more}
            </div>

            <SwitchActions current={derived.current} />

            <div className={classes.nested}>
              {derived.current
                ? <InputField
                    preventAutoFocus={true}
                    className={css.standard}
                    submit={::this.submitNewRecord}
                  />
                : null
              }

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
