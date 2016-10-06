import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Observable } from 'rxjs'
import H1 from 'components/H1'
import RecordMap from 'containers/RecordMap'
import InputField from 'components/Input'
import * as Actions from 'actions'
import { selectRecordsAsTree } from './selectors'
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

  createRecordAtRoot() {
    this.setState({ creating: true })
  }

  navigateBackwards() {
    this.props.locationChange(this.props.target.parent)
  }

  navigateToRoot() {
    this.props.locationChange(false)
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
        user: this.props.user,
      })
    }

    this.setState({ creating: false })
  }

  render() {
    return (
      <div>
        <div
          className={`${css.status} ${this.state.fade ? css.fade : ''}`}
          onClick={this.props.logout}>
          {this.props.message}
        </div>

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

        <RecordMap records={this.props.records} />

        <H1 className={css.perspective}>
          <span onClick={this.props.changeLayout}>
            {this.props.layout.tree ? '⦶' : '⊖'}
          </span>
        </H1>

        {this.props.layout.card
          ? <div
              className={css.header}
              onClick={::this.navigateToRoot}>
              ⧉
            </div>
          : null
        }

        {!this.props.target && this.props.layout.card
          ? <button
              className={css.newRoot}
              onClick={::this.createRecordAtRoot}>+</button>
          : null
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    target: state.target,
    message: `Sup ${!!state.user ? state.user.displayName : 'Why are you here?'}`,
    user: state.user,
    loading: state.loading,
    records: selectRecordsAsTree(state),
    layout: state.layout,
  }),
Actions)(Card)
