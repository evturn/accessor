import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from 'api/actions'
import css from './style.css'

export class Records extends Component {
  render() {
    return (
      <div className={css.content}>
        {this.props.records
          ? this.props.records.map(
              (x, i) =>
                <div
                  key={i}
                  className={css.record}
                  onClick={_ => console.log(x.id)}>
                  {x.title}
                </div>
            )
          : null
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    records: state.data.records,
  }),
  Actions
)(Records)