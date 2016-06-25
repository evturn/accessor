import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import {
  getRecords,
  recordSelected,
  navigateToRoot,
} from 'containers/Record/actions'

import H1 from 'components/H1'
import List from 'components/List'
import LoadingIndicator from 'components/LoadingIndicator'

import Record from 'containers/Record'

import css from './styles.css'

class RecordMap extends Component {
  componentDidMount() {
    this.props.getRecords()
  }

  navigateToRoot = target => {
    this.props.navigateToRoot(target)
  }

  renderRecord = record => {
    return (
      <Record
        key={record.id}
        {...record}>{
          record._children
          ? <ul>{record._children.map(this.renderRecord)}</ul>
          : null
      }</Record>
    )
  }

  render() {
    const {
      records,
      target,
      loading,
    } = this.props

    return (
      <div className={css.x}>
        <H1
          className={css.header}
          onClick={_ => this.navigateToRoot(target)}>
          ⧉
        </H1>
        <div className={css.nav}>{
          target
            ? <span
                className={css.back}
                onClick={_ => this.props.recordSelected(target.parent)}>
                ⬅︎
              </span>
            : null
        }</div>
          {loading
            ? <List component={LoadingIndicator} />
            : records && !loading
              ? <ul className={css.list}>
                  {records.map(this.renderRecord)}
                </ul>
              : null
          }
        </div>
    )
  }
}

RecordMap.propTypes = {
  changeRoute: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  records: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  getRecords: PropTypes.func,
  recordSelected: PropTypes.func,
  target: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
}

const mapDispatchToProps = dispatch => ({
  getRecords: _ => dispatch(getRecords()),
  recordSelected: id => dispatch(recordSelected(id)),
  navigateToRoot: target => dispatch(navigateToRoot(target)),
})

export default connect(
  ({ global }) => ({
    records: global.records,
    target: global.target,
    loading: global.loading,
  }),
  mapDispatchToProps
)(RecordMap)
