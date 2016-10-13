import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/Link'
import Button from 'components/Button'
import { deleteData } from 'api/actions'
import css from './style.css'

export const RecordView = ({ children, parent, dependents, deleteData, title, back }) => {

  return (
    <div>
      <div className={css.bar}>
        <div className={css.left}>
          <Link
            className={css.delete}
            to={back}
            onClick={_ => deleteData(dependents)} />
        </div>
        <div className={css.title} />
        <div className={css.right}>
          <Link className={css.back} to={back}>Back</Link>
        </div>
      </div>

      <div className={css.body}>
        <input className={css.input} defaultValue={title} />
        <div className={css.label} />

        <div className={css.items}>
          {children.map(x =>
            <div key={x.id} className={css.child}>
              <Link className={css.to} to={x.url}>{x.title}</Link>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default connect(null, { deleteData })(RecordView)