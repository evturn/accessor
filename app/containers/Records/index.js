import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router/Redirect'
import classNames from 'classnames/bind'
import Modal from 'containers/Modal'
import MenuBar from 'containers/MenuBar'
import InputField from 'components/Input'
import * as Actions from 'api/actions'
import css from './style.css'

class Records extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Logout onClick={this.props.logout} />
        {this.props.records
          ? this.props.records.map((x, i) => <div key={i}>{x.title}</div>)
          : null
        }
        <MenuBar />
        <Modal />
      </div>
    )
  }
}

function Logout(props) {
  return (
    <div
      className={css.logout}
      onClick={props.onClick}>Logout</div>
  )
}

export default connect(
  state => ({
    user: state.user,
    records: state.data.records,
  }),
  Actions)
(Records)
