import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/Link'
import Match from 'react-router/Match'
import Record from 'containers/Record'
import css from './style.css'

export const Records = ({ items }) => {
  return (
    <div className={css.records}>
      {items.map(x =>
        <div key={x.id} className={css.record}>
          <Link className={css.link} to={x.url}>
            {x.title}
          </Link>
        </div>
      )}
      <Match pattern="/records/:id" component={Record} />
    </div>
  )
}

export default connect(
  state => ({
    items: state.data.records,
  })
)(Records)