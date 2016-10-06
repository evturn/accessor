import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import LoadingHandler from 'components/LoadingHandler'
import Record from 'containers/Record'
import css from './styles.css'

class RecordMap extends Component {
  renderRecord(record) {
    return (
      <Record
        {...record}
        key={record.id}>
        {record._children
          ? <ul>{record._children.map(::this.renderRecord)}</ul>
          : null
        }
      </Record>
    )
  }

  render() {
    return (
      <ul className={css.recordMap}>
        {this.props.records && !this.props.loading
          ? this.props.records.map(::this.renderRecord)
          : null
        }
      </ul>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    records: ownProps.records,
    loading: state.loading,
    layout: state.layout,
  })
)(RecordMap)
