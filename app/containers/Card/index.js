import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import * as actions from 'containers/actions'

import H1 from 'components/H1'
import RecordMap from 'containers/RecordMap'
import InputField from 'components/Input'

import css from './styles.css'

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      creating: false,
    }
  }

  shouldPureComponentUpdate = shouldPureComponentUpdate

  componentDidMount() {
    this.props.loadInitialState()
  }

  createRecordAtRoot() {
    this.setState({ creating: true })
  }

  submitNewRecord(value) {
    if (value.length) {
      this.props.createRecord({
        parent: false,
        record: {
          title: value,
          more: `I live at the root and I calmy enjoy ${value}!`
        }
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

export default connect(mapStateToProps, actions)(Card)
