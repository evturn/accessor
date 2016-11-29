import React, { Component } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import LinkAccounts from 'containers/LinkAccounts'
import QuickText from './QuickText'
import QuickUpload from './QuickUpload'
import QuickURL from './QuickURL'
import DashboardGrid from './DashboardGrid'
import DashboardList from './DashboardList'
import { firebaseDatabase, firebaseAuth } from 'api/auth'
import DashboardOptions from './DashboardOptions'
import css from './style.css'

export class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {records: [], active: false}
    this.updateData = ::this.updateData
    this.handleClick = ::this.handleClick
    this.flatten = ::this.flatten
    this.flattenSnapshot = ::this.flattenSnapshot
    this.navigateToList = ::this.navigateToList
  }

  componentDidMount() {
    const recordsRef = firebaseDatabase()
      .ref(`records/${firebaseAuth().currentUser.uid}`)
    this.setState({ recordsRef })
    recordsRef
      .orderByKey()
      .on('child_added', this.updateData)
  }

  updateData(snap) {
    const { records } = this.state
    const flattened = this.flattenSnapshot(snap)
    this.setState({records: records.concat(flattened)})
  }

  handleClick(id) {
    const { recordsRef } = this.state
    recordsRef
      .child(id)
      .once('value')
      .then(this.flattenSnapshot)
      .then(active => this.setState({ active }))
  }

  flattenSnapshot(snap) {
    return {
      id: snap.key,
      data: this.flatten(snap.val())
    }
  }

  flatten(val) {
    return Object.keys(val)
      .reduce((acc, x) => [{id: x, ...val[x]}].concat(acc), [])
  }

  navigateToList() {
    this.setState({active: false})
  }

  render() {
    const { option } = this.props
    const { records, active } = this.state
    return (
      <div className={css.root}>
        {active
          ? <div
              onClick={this.navigateToList}
              className={css.back}>Back</div>
              : null}
        {!option
          ? null
          : option === 'write'
            ? <QuickText />
            : option === 'upload'
              ? <QuickUpload />
              : option === 'link'
                ? <QuickURL />
                : null}
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
  })
)(Dashboard)
