import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import InputField from 'components/Input'
import InputEditor from 'containers/Editor'
import * as Actions from './actions'
import { selectComputedStyles } from './selectors'
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
    this.props.locationChange(this.props.id)
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
      this.props.layout.card
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
                  : <div
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
              <InputEditor />
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
  card: PropTypes.bool,
  tree: PropTypes.bool,
  computeStyles: PropTypes.func,
}

export default connect(
  (state, ownProps) => ({
    target: state.target,
    layout: state.layout,
    computeStyles: selectComputedStyles(state, ownProps)
  }),
  Actions
)(Record)
