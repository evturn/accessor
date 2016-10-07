import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Observable } from 'rxjs'
import H1 from 'components/H1'
import RecordMap from 'containers/RecordMap'
import InputField from 'components/Input'
import * as Actions from 'api/actions'
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
    this.props.locationWillChange(this.props.target.parent)
  }

  navigateToRoot() {
    this.props.locationWillChange(false)
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

  submitNewRecord(value) {
    if (value.length) {
      this.props.createRecord({
        key: this.props.user.id,
        data: {
          title: value,
          parent: false,
        }
      })
    }

    this.setState({ creating: false })
  }

  render() {
    return (
      <div>
        {this.props.user ? <div className={css.logout} onClick={this.props.logout}>Logout</div> : null}
        <div
          className={`${css.status} ${this.state.fade ? css.fade : ''}`}>
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
    message: !!state.user ? `Sup ${state.user.displayName}` : 'Welcome, sign in.',
    user: state.user,
    loading: state.loading,
    location: state.location,
    records: state.data.records,
    layout: state.layout,
  }),
Actions)(Card)
