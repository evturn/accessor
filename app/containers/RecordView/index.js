import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/Link'
import Input from 'components/Input'
import { updateItem, deleteData } from 'api/actions'
import css from './style.css'

export const RecordView = ({ updateItem, deleteData, ...rest }) => {
  return (
    <div>
      <div className={css.bar}>
        <div className={css.left}>
          <Link
            className={css.delete}
            to={rest.back}
            onClick={_ => deleteData(dependents)} />
        </div>
        <div className={css.header} />
        <div className={css.right}>
          <Link className={css.back} to={rest.back}>Back</Link>
        </div>
      </div>

      <div className={css.body}>
        <Input
          className={css.title}
          value={rest.title}
          onSubmit={val => updateItem({...rest, title: val})} />
        <ChildRecords
          items={rest.children}
          onSubmit={updateItem} />
      </div>
    </div>
  )
}

const ChildRecords = ({ items, onSubmit }) => {
  if (!items.length) { return null }
  return (
    <div className={css.items}>
      <div className={css.records} />
      {items.map(x =>
        <div key={x.id} className={css.child}>
          <Input
            className={css.title}
            value={x.title}
            onSubmit={val => onSubmit({...x, title: val})} />
          <Link className={css.link} to={x.url} />
        </div>
      )}
    </div>
  )
}


export default connect(null, { updateItem, deleteData })(RecordView)