import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Observable } from 'rxjs'
import classNames from 'classnames/bind'
import css from './style.css'

export class Record extends Component {
  constructor(props) {
    super(props)
    this.state = { enter: false }
  }

  componentDidMount() {
    this.unsubscribe = Observable
      .timer(100)
      .map(::this.toggleView)
      .subscribe()
  }

  componentWillUnMount() {
    this.unsubscribe()
  }

  toggleView() {
    this.setState({ enter: !this.state.enter })
  }

  render() {
    const { enter } = this.state
    const { c } = this.props
    return (
      <div className={c('view', { enter })}>
      <div className={c('bar')}>
        <div className={c('title')} />
        <div className={c('close')} onClick={::this.toggleView} />
      </div>
      <div className={c('body')}>
        <input className={c('input')} defaultValue={this.props.title} />
        <div className={c('label')} />
      </div>
      </div>

    )
  }
}

export default connect(
  (state, ownProps) => {
    return {
      ...state.data.byId[ownProps.params.id],
      c: classNames.bind(css),
    }
})(Record)