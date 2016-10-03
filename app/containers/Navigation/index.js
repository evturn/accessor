import React, { Component } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Card from 'containers/Card'
import Editor from 'containers/Editor'
import * as Actions from './actions'
import css from './style.css'

class Navigation extends Component {

  componentWillMount() {
    this.props.fetchAll(this.props.user)
  }

  render() {
    return (
      <div className={css.root}>
        <Match pattern="/" component={Card} />
        <Match pattern="/input" component={Editor} />
      </div>
    )
  }
}

export default connect(state => ({ ...state }), Actions)(Navigation)
