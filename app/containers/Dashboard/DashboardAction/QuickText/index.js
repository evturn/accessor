import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuickHeader from 'components/Headers/QuickHeader'
import css from './style.css'

export class QuickText extends Component {
  render() {
    return (
      <div>
        <QuickHeader text='Note' />
        <textarea className={css.input} rows="3" />
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state
  })
)(QuickText)
