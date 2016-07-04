import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'


import { requestRecords } from '../../actions'

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
    }
  }

  shouldPureComponentUpdate = shouldPureComponentUpdate

  componentDidMount() {
    this.props.requestRecords()
  }

  createRecordAtRoot() {
    this.setState({ creating: true })
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
        title: value,
        more: `I live at the root and I calmy enjoy ${value}!`,
        parent: false,
      })
    }

    this.setState({ creating: false })
  }

  render() {
    return (
      <div className={css.x}>

        <H1
          className={css.header}
          onClick={_ => this.props.navigateToRoot(this.props.target)}>
          ⧉
        </H1>

        <H1 className={css.perspective}>
          {this.props.treeView
            ? <span onClick={this.props.selectCardView}>⦶</span>
            : <span onClick={this.props.selectTreeView}>⊖</span>
          }
        </H1>

        {this.props.target
          ? <div className={css.nav}>
              <span
                className={css.back}
                onClick={_ => this.props.changeTarget(this.props.target.parent)}>
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

        {!this.props.target && this.props.cardView
          ? <button
              className={css.newRoot}
              onClick={_ => this.createRecordAtRoot()}>+</button>
          : null
        }

        <div className={css.status}>{this.props.message}</div>

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

export default connect(mapStateToProps, { requestRecords })(Card)
