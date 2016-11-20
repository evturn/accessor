import React from 'react'
import Match from 'react-router/Match'
import LinkAccounts from 'containers/LinkAccounts'
import css from './style.css'

export const Dashboard = props => {
  return (
    <div className={css.root}>
      <div>Sup dog.</div>
      <Match pattern='/settings/account' component={LinkAccounts} />
    </div>
  )
}

export default Dashboard
