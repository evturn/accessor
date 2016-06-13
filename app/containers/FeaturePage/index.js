/* eslint-disable react/prefer-stateless-function */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import { createSelector } from 'reselect'

import { loadRecords } from '../App/actions'
import {
  selectRecords,
  selectLoading,
  selectError,
  selectOhFuck,
} from '../App/selectors'

import Button from 'components/Button'
import H1 from 'components/H1'
import List from 'components/List'

import LoadingIndicator from 'components/LoadingIndicator'
import {
  RecordMap,
  Record,
} from 'components/Record'

import styles from './styles.css'

export class FeaturePage extends Component {
  componentDidMount() {
    this.props.loadRecords()
  }

  openRoute = route => {
    this.props.changeRoute(route)
  }

  openHomePage = _ => {
    this.openRoute('/')
  }

  render() {
    return (
      <div>
        <H1 className={styles.header}>X</H1>
        <ul className={styles.list}>
          {(this.props.loading) ? (
            <List component={LoadingIndicator} />
          ) : (this.props.records !== false) ? (
            this.props.records.map((x, i) => (
              <div
                key={i}
                className={styles.rootRecord}>
                <Record record={x} />
              </div>
            ))
          ) : null }
        </ul>
        <Button handleRoute={this.openHomePage}>Home</Button>
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
  loadRecords: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  changeRoute: url => dispatch(push(url)),
  loadRecords: _ => dispatch(loadRecords()),
  dispatch,
})

export default connect(
  createSelector(
    selectRecords(),
    selectLoading(),
    selectError(),
    (records, loading, error) => ({
      records, loading, error
    })
  ),
  mapDispatchToProps
)(FeaturePage)
