import React from 'react'
import Match from 'react-router/Match'
import LinkAccounts from 'containers/LinkAccounts'
import DashboardOptions from './DashboardOptions'
import css from './style.css'

export const Dashboard = props => {
  return (
    <div className={css.root}>
      <div className={css.header}>Sup dog.</div>
      <Match pattern='/settings/account' component={LinkAccounts} />
      <DashboardOptions />
    </div>
  )
}

export default Dashboard
