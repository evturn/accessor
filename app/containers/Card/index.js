import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Observable } from 'rxjs'
import shouldPureComponentUpdate from 'react-pure-render/function'

import { getCurrentTarget } from '../../reducers'
import * as actions from '../../actions'

import H1 from 'components/H1'
import RecordMap from 'containers/RecordMap'
import InputField from 'components/Input'

import css from './styles.css'

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      creating: false,
      prompt: false,
      fade: false,
    }
  }

  shouldPureComponentUpdate = shouldPureComponentUpdate

  componentDidMount() {
    this.props.requestRecords()
  }

  createRecordAtRoot() {
    this.setState({ creating: true })
  }

  navigateBackwards() {
    this.props.navigateBackwards(this.props.target.parent)
  }

  navigateToRoot() {
    this.props.navigateToRoot(this.props.target)
  }

  removeRecord() {
    this.setState({ prompt: true })
  }

  confirmRemove() {
    this.props.removeRecord(this.props.target)
    this.dismissAlert()
  }

  dismissAlert() {
    this.setState({ prompt: false })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.setState({ fade: false })
      Observable.timer(2000)
        .subscribe(x => this.setState({ fade: true }))
    }
  }

  submitNewRecord(value) {
    if (value.length) {
      this.props.createRecord({
        title: value,
        more: `I live at the root and I calmy enjoy ${value}!`,
        parent: false,
      })
    }

    this.setState({ creating: false })
  }

  render() {
    return (
      <div>
        <div className={`${css.status} ${this.state.fade ? css.fade : ''}`}>{this.props.message}</div>

        {this.props.target
          ? <div className={css.nav}>
              <span
                className={css.back}
                onClick={::this.navigateBackwards}>
                ⬅︎
              </span>
              <span
                className={css.remove}
                onClick={::this.removeRecord}>
                ╳
              </span>
            </div>
          : null
        }

        {this.state.creating
          ? <InputField
              className={css.input}
              submit={::this.submitNewRecord}
            />
          : null
        }

        <div className={this.state.prompt ? css.alert : css.hide}>
          You sure you know what you're doing?
          <div className={css.btns}>
            <button onClick={::this.confirmRemove}>Yes</button>
            <button onClick={::this.dismissAlert}>No, my best friend is a banana</button>
          </div>
        </div>

        <RecordMap
          cardView={this.props.cardView}
          treeView={this.props.treeView}
          records={this.props.records}
        />

        <H1 className={css.perspective}>
          {this.props.treeView
            ? <span onClick={this.props.selectCardView}>⦶</span>
            : <span onClick={this.props.selectTreeView}>⊖</span>
          }
        </H1>

        {this.props.cardView
          ? <div
              className={css.header}
              onClick={::this.navigateToRoot}>
              ⧉
            </div>
          : null
        }

        {!this.props.target && this.props.cardView
          ? <button
              className={css.newRoot}
              onClick={::this.createRecordAtRoot}>+</button>
          : null
        }
      </div>
    )
  }
}

Card.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  records: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  loadInitialState: PropTypes.func,
  changeTarget: PropTypes.func,
  target: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  cardView: PropTypes.bool,
  treeView: PropTypes.bool,
  message: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
}

const mapStateToProps = state => ({
  target:   state.target,
  message:  state.message,
  loading:  state.loading,
  records:  state.records,
  cardView: state.cardView,
  treeView: state.treeView,
})

export default connect(mapStateToProps, actions)(Card)
