import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

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

  renderHeader() {
    return ({ navigateToRoot, target }) => (
      <H1
        className={css.header}
        onClick={_ => navigateToRoot(target)}>
        ⧉
      </H1>
    )
  }

  renderCardViewNav() {
    return ({ target, recordSelected }) => (
      <div className={css.nav}>{
        target
          ? <span
              className={css.back}
              onClick={_ => recordSelected(target.parent)}>
              ⬅︎
            </span>
          : null
      }</div>
    )
  }

  renderLoadingIndicator() {
    return ({ loading, records, children }) => (
      loading
        ? <List component={LoadingIndicator} />
        : records && !loading
          ? children
          : null
      )
  }

  renderAllRecords() {
    return ({ records, renderRecord }) => (
      <ul className={css.list}>
        {records.map(renderRecord)}
      </ul>
    )
  }

  renderRecord(record) {
    return (
      <Record
        {...record}
        key={record.id}>{
        record._children
          ? <ul>{record._children.map(::this.renderRecord)}</ul>
          : null
      }</Record>
    )
  }

  render() {
    const AppHeader = this.renderHeader()
    const CardViewHeader = this.renderCardViewNav()
    const Records = this.renderAllRecords()
    const LoadHandler = this.renderLoadingIndicator()

    return (
      <div className={css.x}>
        <AppHeader
          target={this.props.target}
          navigateToRoot={this.props.navigateToRoot}
        />
        <CardViewHeader
          target={this.props.target}
          recordSelected={this.props.recordSelected}
        />
        <LoadHandler
          loading={this.props.loading}
          records={this.props.records}>
          <Records
            records={this.props.records}
            renderRecord={::this.renderRecord}
          />
        </LoadHandler>
      </div>
    )
  }
}

RecordMap.propTypes = {
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
