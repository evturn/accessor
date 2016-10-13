import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/Link'
import Match from 'react-router/Match'
import MenuBar from 'containers/MenuBar'
import LoadingIndicator from 'components/LoadingIndicator'
import { deleteData, openModal } from 'api/actions'
import css from './style.css'

export const Records = ({ items, deleteData, user, loading }) => {
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
                <div className={css.remove} onClick={_ => deleteData(x.dependents)} />
              </li>
            )}
          </ul>
      }
      <MenuBar onClick={openModal} />
    </div>
  )
}

export default connect(
  state => ({
    items: state.data.items,
    loading: state.auth.loading,
  }),
  { deleteData, openModal }
)(Records)