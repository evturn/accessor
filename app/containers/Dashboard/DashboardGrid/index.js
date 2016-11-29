import React, { Component } from 'react'
import { connect } from 'react-redux'
import css from './style.css'

export class DashboardGrid extends Component {
  render() {
    const { id, data } = this.props
    return (
      <div className={css.root}>
        {data.map(x =>
          <div
            className={css.item}
            key={x.id}
            style={{backgroundImage: `url(${x.url})`}} />
        )}
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state
  })
)(DashboardGrid)
