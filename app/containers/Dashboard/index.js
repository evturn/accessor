import React, { Component } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import LinkAccounts from 'containers/LinkAccounts'
import DashboardAction from './DashboardAction'
import DashboardGrid from './DashboardGrid'
import DashboardList from './DashboardList'
import DashboardOptions from './DashboardOptions'
import * as Database from 'api/database'
import * as Actions from 'api/actions'
import css from './style.css'

export class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {records: [], active: false, pushKey: ''}
    this.updateData = ::this.updateData
    this.handleClick = ::this.handleClick
    this.createPushKey = :: this.createPushKey
    this.clearActiveState = ::this.clearActiveState
    this.setSelectedToActive = ::this.setSelectedToActive
  }

  componentDidMount() {
    this.setState({pushKey: this.createPushKey()})
    Database.recordsRef()
      .orderByKey()
      .on('value', this.updateData)
  }

  createPushKey() {
    return Database.recordsRef().push().key
  }

  updateData(snap) {
    const val = snap.val()
    this.setState({records: !!val ? Database.recordsRefToList(val) : []})
  }

  handleClick(id) {
    this.state.records
      .filter(x => x.id === id)
      .map(this.setSelectedToActive)
  }

  setSelectedToActive(val) {
    this.setState({active: val, pushKey: val.id})
  }

  clearActiveState() {
    this.props.selectDashboardOption(false)
    this.setState({active: false, pushKey: this.createPushKey()})
  }

  render() {
    const { option } = this.props
    const { records, active, pushKey } = this.state
    return (
      <div className={css.root}>
        <Match pattern='/dashboard/settings' component={LinkAccounts} />
        <Match pattern='/dashboard' exactly render={props =>
          <div>
            {active
              ? <div
                  onClick={this.clearActiveState}
                  className={css.back}>Back</div>
              : null}

            <DashboardAction option={option} pushKey={pushKey} />
            {active
              ? <DashboardGrid {...active} />
              : <DashboardList records={records} onClick={this.handleClick} />}
            <DashboardOptions />
          </div>
        } />
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
