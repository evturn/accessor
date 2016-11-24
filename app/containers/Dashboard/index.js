import React, { Component } from 'react'
import Match from 'react-router/Match'
import LinkAccounts from 'containers/LinkAccounts'
import DropTarget from 'components/DropTarget'
import DashboardOptions from './DashboardOptions'
import css from './style.css'

export class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {attach: false}
    this.showDropZone = ::this.showDropZone
  }

  showDropZone() {
    this.setState({attach: true})
  }

  render() {
    const { attach } = this.state
    return (
      <div className={css.root}>
        {attach
          ? <DropTarget>
              <div className={css.upload}>Quick Upload</div>
            </DropTarget>
          : null}
        <Match pattern='/settings/account' component={LinkAccounts} />
        <DashboardOptions selectAttach={this.showDropZone} />
      </div>
    )
  }
}

export default Dashboard
