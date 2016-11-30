import React, { Component } from 'react'
import Match from 'react-router/Match'
import Dashboard from 'containers/Dashboard'
import Settings from 'containers/Settings'
import BackButton from 'components/Buttons/BackButton'
import * as Database from 'api/database'
import css from './style.css'

export class Home extends Component {
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

  resetUI() {
    this.setState({
      option: '',
      menuVisible: false,
      active: false,
      pushKey: this.createPushKey()
    })
  }

  selectGroup(id) {
    this.state.records
      .filter(x => x.id === id)
      .map(x => this.setState({active: x, pushKey: x.id}))
  }


  toggleOptions() {
    this.setState({menuVisible: !this.state.menuVisible})
  }

  selectOption(option) {
    return _ => this.setState({option, menuVisible: false})
  }

  render() {
    const { active } = this.state
    const { pathname } = this.props.location
    return (
      <div>
        {active || pathname !== '/dashboard'
          ? <div onClick={this.resetUI}>
              <BackButton to='/dashboard' className={css.back} />
            </div>
          : null}
        <Match pattern='/dashboard' render={props =>
          <Dashboard
            {...props}
            {...this.state}
            selectGroup={this.selectGroup}
            selectOption={this.selectOption}
            toggleOptions={this.toggleOptions}
            resetUi={this.resetUI} />
        } />
        <Match pattern='/settings' render={props =>
          <Settings
            {...props}
            {...this.state}
            resetUI={this.resetUI} />
        } />
      </div>
    )
  }
}

export default Home