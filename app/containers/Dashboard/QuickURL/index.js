import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuickHeader from 'components/Headers/QuickHeader'
import css from './style.css'

export class QuickURL extends Component {
  render() {
    return (
      <div>
        <QuickHeader text='Link' />
        <input className={css.input} placeholder="http://" type="text" />
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state
  })
)(QuickURL)
