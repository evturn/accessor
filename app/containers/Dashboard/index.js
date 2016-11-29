import React, { Component } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import LinkAccounts from 'containers/LinkAccounts'
import DashboardAction from './DashboardAction'
import DashboardGrid from './DashboardGrid'
import DashboardList from './DashboardList'
import { firebaseDatabase, firebaseAuth } from 'api/auth'
import DashboardOptions from './DashboardOptions'
import * as Actions from 'api/actions'
import css from './style.css'

export class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {records: [], active: false, pushKey: ''}
    this.updateData = ::this.updateData
    this.handleClick = ::this.handleClick
    this.flattenSnapshot = ::this.flattenSnapshot
    this.setValueToActive = ::this.setValueToActive
    this.clearActiveState = ::this.clearActiveState
  }

  componentDidMount() {
    const userId = firebaseAuth().currentUser.uid
    const recordsRef = firebaseDatabase().ref(`records/${userId}`)
    this.setState({recordsRef, pushKey: recordsRef.push().key})

    recordsRef
      .orderByKey()
      .on('value', this.updateData)
  }

  updateData(snap) {
    this.setState({records: this.flattenSnapshot(snap.val())})
  }

  handleClick(id) {
    this.state.records
      .filter(x => x.id === id)
      .map(this.setValueToActive)
  }

  setValueToActive(val) {
    const { recordsRef } = this.state
    this.setState({ active: val, pushKey: val.id })
  }

  flattenSnapshot(val) {
    return Object.keys(val)
      .map(x => ({
        id: x,
        data: Object.keys(val[x])
          .map(y => ({id: y, ...val[x][y]}))
      }))
  }

  clearActiveState() {
    const { selectDashboardOption } = this.props
    const { recordsRef } = this.state
    selectDashboardOption(false)
    this.setState({active: false, pushKey: recordsRef.push().key})
  }

  render() {
    const { option } = this.props
    const { records, active, pushKey } = this.state
    return (
      <div className={css.root}>
        {active
          ? <div
              onClick={this.clearActiveState}
              className={css.back}>Back</div>
          : null}

        <DashboardAction option={option} pushKey={pushKey} />
        {active
          ? <DashboardGrid {...active} />
          : <DashboardList records={records} onClick={this.handleClick} />}
        <Match pattern='/settings/account' component={LinkAccounts} />
        <DashboardOptions />
      </div>
    )
  }
}

export default connect(
  state => ({
    option: state.ui.option
  }),
  Actions
)(Dashboard)
