import React, { Component } from 'react'
import DashboardAction from './DashboardAction'
import DashboardGrid from './DashboardGrid'
import DashboardList from './DashboardList'
import DashboardOptions from './DashboardOptions'
import { firebaseAuth } from 'api'
import css from './style.css'

export class Dashboard extends Component {
  render() {
    const {
      selectGroup, selectOption, toggleOptions,
      option, records, active, pushKey, menuVisible
    } = this.props
    return (
      <div className={css.root}>
        <DashboardAction
          option={option}
          pushKey={pushKey} />

        {active
          ? <DashboardGrid {...active} />
          : <DashboardList
              records={records}
              onClick={selectGroup} />}

        <DashboardOptions
          selectOption={selectOption}
          toggleOptions={toggleOptions}
          menuVisible={menuVisible} />
      </div>
    )
  }
}

export default Dashboard