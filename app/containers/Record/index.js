import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import InputField from 'components/Input'
import {
  SwitchActions,
  SwitchDrag,
  SwitchControls,
} from 'components/Switch'

import * as actions from '../../actions'
import { getComputedStyles } from '../../reducers'

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
        title: value,
        parent: this.props.id,
        more: `I can not shut the hell about ${value}!`
      })
    }

    this.setState({ creating: false })
  }

  submitUpdatedRecord(value) {
    if (value.length) {
      this.props.updateRecord({
        more: this.props.more,
        title: value,
        id: this.props.id,
        parent: this.props.parent
      })
    }

    this.setState({ updating: false })
  }

  render() {
    const { classes, derived } = this.props.computeStyles(this.state.expand, css)

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
            <div className={css.drag}>⋯</div>

            <div className={`${css.record} ${this.state.dragging ? css.dragging : ''}`}>
              {this.props.title}
            </div>

            <div className={css.records}>
              {this.props.children}
            </div>
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
  branches: PropTypes.object,
  target: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  cardView: PropTypes.bool,
  treeView: PropTypes.bool,
}


const matchStateToProps = (state, ownProps) => {
  return {
    branches: state.branches,
    target: state.target,
    cardView: state.cardView,
    treeView: state.treeView,
    computeStyles: getComputedStyles(state, ownProps)
  }
}

export default connect(matchStateToProps, actions)(Record)
