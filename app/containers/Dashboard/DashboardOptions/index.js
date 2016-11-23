import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddIcon from 'components/Icons/AddIcon'
import LinkIcon from 'components/Icons/LinkIcon'
import AttachFileIcon from 'components/Icons/AttachFileIcon'
import WidgetsIcon from 'components/Icons/WidgetsIcon'
import NoteIcon from 'components/Icons/NoteIcon'
import css from './style.css'

export class DashboardOptions extends Component {
  constructor(props) {
    super(props)
    this.state = {open: false}
    this.toggleOptions = ::this.toggleOptions
  }

  toggleOptions() {
    this.setState({open: !this.state.open})
  }

  render() {
    const { open } = this.state
    return (
      <div className={css.root}>
        <div className={css.wrap}>
          <div className={`${css.options} ${open ? css.on : css.off}`}>
            <ul className={css.ul}>
              <li className={css.attach}><AttachFileIcon className={css.icon} /></li>
              <li className={css.note}><NoteIcon className={css.icon} /></li>
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
  })
)(DashboardOptions)
