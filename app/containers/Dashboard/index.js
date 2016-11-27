import React, { Component } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import LinkAccounts from 'containers/LinkAccounts'
import QuickText from './QuickText'
import QuickUpload from './QuickUpload'
import QuickURL from './QuickURL'
import DashboardOptions from './DashboardOptions'
import css from './style.css'

export class Dashboard extends Component {
  render() {
    const { option } = this.props
    return (
      <div className={css.root}>
        {!option
          ? null
          : option === 'write'
            ? <QuickText />
            : option === 'upload'
              ? <QuickUpload />
              : option === 'link'
                ? <QuickURL />
                : null}
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
