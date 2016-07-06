import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import InputField from 'components/Input'

import * as actions from '../../actions'
import { getComputedStyles, getCurrentTarget } from '../../reducers'

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

  changeTarget() {
    this.props.changeTarget(this.props.id)
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
        ? <li className={`${css.li} ${derived.root ? css.root : ''}`}>
            <div className={classes.title}>

              {this.state.updating
                ? <InputField
                    className={`${css.editor} ${classes.title}`}
                    submit={::this.submitUpdatedRecord}
                    value={this.props.title}
                  />
                : derived.current
                  ? <div
                      className={css.text}
                      onClick={::this.updatingRecord}>
                      {this.props.title}
                    </div>
                  :  <div
                      className={css.text}
                      onClick={::this.changeTarget}>
                      {this.props.title}
                    </div>
              }

              {!derived.current
                ? <div className={`${css.ctrls} ${this.state.updating ? css.hide : ''}`}>
                    <button
                      className={css.select}
                      onClick={::this.toggleDescription}>
                      <div>{this.state.expand ? `∴` : `∵`}</div>
                    </button>
                  </div>
                : null
              }

            </div>

            <div className={classes.expand}>
              {this.props.more}
            </div>

            {derived.current
              ? <div className={css.btns}>
                  <div className={css.clip}>📎</div>
                </div>
              : null
            }

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
  target: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  cardView: PropTypes.bool,
  treeView: PropTypes.bool,
  computeStyles: PropTypes.func,
}


const matchStateToProps = (state, ownProps) => {
  return {
    target: state.target,
    cardView: state.cardView,
    treeView: state.treeView,
    computeStyles: getComputedStyles(state, ownProps)
  }
}

export default connect(matchStateToProps, actions)(Record)
