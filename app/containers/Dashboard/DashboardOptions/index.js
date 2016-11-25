import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddIcon from 'components/Icons/AddIcon'
import LinkIcon from 'components/Icons/LinkIcon'
import AttachFileIcon from 'components/Icons/AttachFileIcon'
import WidgetsIcon from 'components/Icons/WidgetsIcon'
import NoteIcon from 'components/Icons/NoteIcon'
import * as Actions from 'api/actions'
import css from './style.css'

export class DashboardOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {open: false}
    this.selectOption = ::this.selectOption
    this.toggleOptions = ::this.toggleOptions
  }

  toggleOptions() {
    this.setState({open: !this.state.open})
  }

  selectOption(option) {
    const { selectDashboardOption } = this.props
    return _ => {
      this.setState({open: false})
      selectDashboardOption(option)
    }
  }

  render() {
    const { open } = this.state
    return (
      <div className={css.root}>
        <div className={css.wrap}>
          <div className={`${css.options} ${open ? css.on : css.off}`}>
            <ul className={css.ul}>
              <li
                onClick={this.selectOption('upload')}
                className={css.attach}>
                <AttachFileIcon className={css.icon} />
              </li>
              <li
                onClick={this.selectOption('write')}
                className={css.note}>
                <NoteIcon className={css.icon} />
              </li>
              <li className={css.link}><LinkIcon className={css.icon} /></li>
              <li className={css.widgets}><WidgetsIcon className={css.icon} /></li>
            </ul>
          </div>
          <div
            onClick={this.toggleOptions}
            className={css.add}><AddIcon className={css.icon} /></div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state
  }),
  Actions
)(DashboardOptions)
