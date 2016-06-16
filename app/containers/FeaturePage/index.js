import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import {
  getRecords,
  setRecordActive,
} from 'containers/Record/actions'


import Button from 'components/Button'
import H1 from 'components/H1'
import List from 'components/List'

import LoadingIndicator from 'components/LoadingIndicator'
import Record from 'containers/Record'

import styles from './styles.css'

class FeaturePage extends Component {
  componentDidMount() {
    this.props.getRecords()
  }

  setActive = id => {
    console.log(id)
    this.props.setRecordActive(id)
  }

  recurseRecord = record => {
    return (
      <Record
        setActive={this.setActive.bind(this)}
        key={record.id}
        {...record}>
        { record._children.length
          ? <ul>{record._children.map(this.recurseRecord)}</ul>
          : null}
      </Record>
    )
  }

  render() {
    return (
      <div>
        <H1 className={styles.header}>X</H1>
        <ul className={styles.list}>
          { this.props.loading
            ? <List component={LoadingIndicator} />
            : this.props.records !== false
              ? this.props.records.map(this.recurseRecord)
              : null
          }
        </ul>
      </div>
    )
  }
}
FeaturePage.propTypes = {
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
}

const mapDispatchToProps = dispatch => ({
  getRecords: _ => dispatch(getRecords()),
  setRecordActive: id => dispatch(setRecordActive(id)),
})

export default connect(
  ({ global }) => ({
    records: global.records,
  }),
  mapDispatchToProps
)(FeaturePage)
