import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import LoadingHandler from 'components/LoadingHandler'
import Record from 'containers/Record'
import css from './styles.css'

class RecordMap extends Component {
  shouldPureComponentUpdate = shouldPureComponentUpdate

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
      this.props.records && !this.props.loading
        ? <ul className={css.recordMap}>
            {this.props.records.map(::this.renderRecord)}
          </ul>
        : <LoadingHandler loading={this.props.loading} />
    )
  }
}

RecordMap.propTypes = {
  loading: PropTypes.bool,
  records: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
}

const matchStateToProps = state => ({
  records: state.records,
  loading: state.loading,
})

export default connect(matchStateToProps)(RecordMap)
