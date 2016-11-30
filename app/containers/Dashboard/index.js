import React, { Component } from 'react'
import Match from 'react-router/Match'
import DashboardAction from './DashboardAction'
import DashboardGrid from './DashboardGrid'
import DashboardList from './DashboardList'
import DashboardOptions from './DashboardOptions'
import * as Database from 'api/database'
import css from './style.css'

export class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.resetUI = ::this.resetUI
    this.updateData = ::this.updateData
    this.selectGroup = ::this.selectGroup
    this.selectOption = ::this.selectOption
    this.toggleOptions = ::this.toggleOptions
    this.createPushKey = :: this.createPushKey
  }

  state = {
    records: [],
    active: false,
    menuVisible: false,
    option: '',
    pushKey: ''
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

  selectGroup(id) {
    this.state.records
      .filter(x => x.id === id)
      .map(x => this.setState({active: x, pushKey: x.id}))
  }

  resetUI() {
    this.setState({
      option: '',
      menuVisible: false,
      active: false,
      pushKey: this.createPushKey()
    })
  }

  toggleOptions() {
    this.setState({menuVisible: !this.state.menuVisible})
  }

  selectOption(option) {
    return _ => this.setState({option, menuVisible: false})
  }

  render() {
    const { option, records, active, pushKey, menuVisible } = this.state
    return (
      <div className={css.root}>
        {active
          ? <div
              onClick={this.resetUI}
              className={css.back}>Back</div>
          : null}

        <DashboardAction
          option={option}
          pushKey={pushKey}
          resetUI={this.resetUI} />

        {active
          ? <DashboardGrid {...active} />
          : <DashboardList
              records={records}
              onClick={this.selectGroup} />}

        <DashboardOptions
          selectOption={this.selectOption}
          toggleOptions={this.toggleOptions}
          menuVisible={menuVisible} />
      </div>
    )
  }
}

export default Dashboard