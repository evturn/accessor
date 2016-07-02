import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import {
  loadInitialState,
  navigateToRoot,
  changeTarget,
  selectCardView,
  selectTreeView,
  createRecord,
} from 'containers/actions'

import H1 from 'components/H1'
import RecordMap from 'containers/RecordMap'
import { Input } from 'components/Input'

import css from './styles.css'

class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      creating: false,
      formValue: '',
    }
  }

  shouldPureComponentUpdate = shouldPureComponentUpdate

  componentDidMount() {
    this.props.loadInitialState()
  }

  createRecordAtRoot() {
    this.setState({ creating: true })
  }

  submitNewRecord() {
    if (this.state.formValue.length) {
      this.props.createRecord({
        parent: false,
        record: {
          title: this.state.formValue,
          more: `I live at the root and I calmy enjoy ${this.state.formValue}!`
        }
      })

      this.setState({
        creating: false,
        formValue: '',
      })
    }
  }

  edit(e) {
    if (e.charCode === 13) {
      this.submitNewRecord()
    } else {
      this.setState({ formValue: e.target.value })
    }
  }

  getBackingInstance(input) {
    this.input = input

    if (this.input !== null) {
      this.input.focus()
    }
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
          ? <input
              className={css.input}
              onBlur={::this.submitNewRecord}
              onChange={::this.edit}
              onKeyPress={::this.edit}
              ref={::this.getBackingInstance}
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

const mapDispatchToProps = dispatch => ({
  loadInitialState:     _ => dispatch(loadInitialState()),
  selectCardView:       _ => dispatch(selectCardView()),
  selectTreeView:       _ => dispatch(selectTreeView()),
  changeTarget:       id => dispatch(changeTarget(id)),
  navigateToRoot: target => dispatch(navigateToRoot(target)),
  createRecord: ({ parent, record }) => dispatch(createRecord({ parent, record })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)
