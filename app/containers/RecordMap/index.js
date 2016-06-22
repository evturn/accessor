import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import {
  getRecords,
  recordSelected,
  navigateToRoot,
} from 'containers/Record/actions'

import Button from 'components/Button'
import H1 from 'components/H1'
import List from 'components/List'

import LoadingIndicator from 'components/LoadingIndicator'
import Record from 'containers/Record'

import styles from './styles.css'

class RecordMap extends Component {
  componentDidMount() {
    this.props.getRecords()
  }

  recordSelected = id => {
    this.props.recordSelected(id)
  }

  moveRecord = ({ targetID, parentID }) => {
    this.props.moveRecord({ targetID, parentID })
  }

  recurseRecord = record => {
    const nestedRecords = record._children
      ? <ul>{record._children.map(this.recurseRecord)}</ul>
      : null

    return (
      <Record
        key={record.id}
        recordSelected={this.recordSelected.bind(this)}
        moveRecord={this.moveRecord.bind(this)}
        {...record}>
        {nestedRecords}
      </Record>
    )
  }

  render() {
    return (
      <div>
        <H1
          className={styles.header}
          onClick={_ => this.props.navigateToRoot(this.props.target)}>⧉</H1>
        <div className={styles.nav}>{
          this.props.target
            ? <span
                className={styles.back}
                onClick={_ => this.recordSelected(this.props.target.parent)}>
                ⬅︎
              </span>
            : null
        }</div>
        <ul className={styles.list}>{
          this.props.loading
            ? <List component={LoadingIndicator} />
            : this.props.records !== false
              ? this.props.records.map(this.recurseRecord)
              : null
        }</ul>
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
  }),
  mapDispatchToProps
)(RecordMap)
