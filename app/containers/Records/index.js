import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/Link'
import LoadingIndicator from 'components/LoadingIndicator'
import { deleteNode, openModal } from 'api/actions'
import css from './style.css'

export const Records = ({ items, deleteNode, user, loading }) => {
  return (
    <div className={css.records}>
      {loading
        ? <LoadingIndicator />
        :  <ul>
            {items.map(x =>
              <li key={x.id} className={css.item}>
                <Link className={css.link} to={x.url}>
                  <div  className={css.record}>
                    {x.title}
                  </div>
                </Link>
                <div className={css.remove} onClick={_ => deleteNode(x)} />
              </li>
            )}
          </ul>
      }
    </div>
  )
}

export default connect(
  state => ({
    items: state.data.subtrees.map(x => x.unwrap()),
    loading: state.auth.loading,
  }),
  { deleteNode }
)(Records)