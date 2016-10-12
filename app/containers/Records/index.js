import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/Link'
import Match from 'react-router/Match'
import RecordView from 'containers/RecordView'
import LoadingIndicator from 'components/LoadingIndicator'
import { removeRecord } from 'api/actions'
import css from './style.css'

export const Records = ({ items, removeRecord, user, loading }) => {
  function removeRecurse(dependents) {
    return _ => dependents.map(x => removeRecord({ id: x, child: user.id }))
  }

  return (
    <div className={css.records}>
      {loading
        ? <LoadingIndicator />
        : <ul>
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
      }
      <Match pattern="/records/:id" component={RecordView} />
    </div>
  )
}

export default connect(
  state => ({
    items: state.data.items,
    user: state.user,
    loading: state.loading,
  }),
  { removeRecord }
)(Records)