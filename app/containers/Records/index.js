import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/Link'
import Match from 'react-router/Match'
import Record from 'containers/Record'
import { removeRecord } from 'api/actions'
import css from './style.css'

export const Records = ({ items, removeRecord, user }) => {
  function removeRecurse(dependents) {
    return _ => dependents.map(x => removeRecord({ id: x, child: user.id }))
  }

  return (
    <div className={css.records}>
      <ul>
        {items.map(x =>
          <li key={x.id} className={css.item}>
            <Link className={css.link} to={x.url}>
              <div  className={css.record}>
                {x.title}
              </div>
            </Link>
            <div className={css.remove} onClick={removeRecurse(x.dependents)} />
          </li>
        )}
      </ul>
      <Match pattern="/records/:id" component={Record} />
    </div>
  )
}

export default connect(
  state => ({
    items: state.data.records,
    user: state.user,
  }),
  { removeRecord }
)(Records)