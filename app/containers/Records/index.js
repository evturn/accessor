import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Link from 'react-router/Link'
import Record from 'containers/Record'
import css from './style.css'

export class Records extends Component {
  render() {
    return (
      <div className={css.records}>
        {this.props.records
          ? this.props.records.map(
              x =>
                <div
                  key={x.id}
                  className={css.record}>
                  <Link
                    className={css.link}
                    to={`/records/${x.id}`}>
                    {x.title}
                  </Link>
                </div>
            )
          : null
        }

        <Match pattern="/records/:id" component={Record} />
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    records: state.data.records,
  })
)(Records)