import React, { Component } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import LinkAccounts from 'containers/LinkAccounts'
import DropTarget from 'components/DropTarget'
import DashboardOptions from './DashboardOptions'
import css from './style.css'

export class Dashboard extends Component {

  options = {
    upload: Upload,
    write: Write,
  }


  render() {
    const { option } = this.props
    return (
      <div className={css.root}>
        {!option
          ? null
          : option === 'write'
            ? <Write />
            : option === 'upload'
              ? <Upload />
              : option === 'link'
                ? <URL />
                : null}
        <Match pattern='/settings/account' component={LinkAccounts} />
        <DashboardOptions />
      </div>
    )
  }
}

const Upload = props => {
  return (
    <DropTarget>
      <div className={css.upload}>Quick Upload</div>
    </DropTarget>
  )
}

const Write = props => {
  return (
    <textarea rows="3">
    </textarea>
  )
}

const URL = props => {
  return (
    <input type="text" />
  )
}

export default connect(
  state => ({
    option: state.ui.option
  })
)(Dashboard)
