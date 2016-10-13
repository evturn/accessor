import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/Link'
import Input from 'components/Input'
import { updateItem, deleteData } from 'api/actions'
import css from './style.css'

const RecordView = ({ updateItem, deleteData, ...props }) => {
  return (
    <div className={css.view}>
      <RecordNav {...props} onDelete={deleteData} />
      <div className={css.body}>
        <RecordTitle {...props} onSubmit={updateItem} />
        <ChildRecords items={props.children} onSubmit={updateItem} />
      </div>
    </div>
  )
}

const RecordNav = ({ onDelete, ...props }) => {
  return (
    <div className={css.bar}>
      <div className={css.left}>
        <Link
          className={css.delete}
          to={props.back}
          onClick={_ => onDelete(props.dependents)} />
      </div>
      <div className={css.header} />
      <div className={css.right}>
        <Link
          className={css.back}
          to={props.back}>Back</Link>
      </div>
    </div>
  )
}

const RecordTitle = ({ onSubmit, ...props }) => (
  <Input
    className={css.title}
    value={props.title}
    onSubmit={val => onSubmit({...props, title: val})} />
)

const ChildRecords = ({ onSubmit, items }) => {
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

export default connect(
  null,
  { updateItem, deleteData }
)(RecordView)