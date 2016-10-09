import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/Link'
import Match from 'react-router/Match'
import Record from 'containers/Record'
import css from './style.css'

export class Records extends Component {
  render() {
    return (
      <div className={css.records}>
        <RootRecords items={this.props.records}/>
        <Match pattern="/records/:id" component={Record} />
      </div>
    )
  }
}

const RootRecords = ({ items }) => {
  return (
    <div>
      {items
        ? items.map(x =>
            <div key={x.id} className={css.record}>
              <Link
                className={css.link}
                to={x.url}>
                {x.title}
              </Link>
            </div>
          )
        : 'No records.'
      }
    </div>
  )
}

export default connect(
  state => ({
    records: state.data.records
  })
)(Records)