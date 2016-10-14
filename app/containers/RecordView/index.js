import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/Link'
import Input from 'components/Input'
import { updateItem, deleteData } from 'api/actions'
import css from './style.css'

const RecordView = ({ updateItem, deleteData, item }) => {
  return (
    <div className={css.view}>
      <RecordNav {...item} onDelete={deleteData} />
      <div className={css.body}>
        <RecordTitle {...item} onSubmit={updateItem} />
        <ChildRecords items={item.children} onSubmit={updateItem} />
      </div>
    </div>
  )
}

const RecordNav = ({ onDelete, ...item }) => {
  return (
    <div className={css.bar}>
      <div className={css.left}>
        <Link
          className={css.delete}
          to={item.back}
          onClick={_ => onDelete(item.dependents)} />
      </div>
      <div className={css.header} />
      <div className={css.right}>
        <Link
          className={css.back}
          to={item.back}>Back</Link>
      </div>
    </div>
  )
}

const RecordTitle = ({ onSubmit, ...item }) => (
  <Input
    className={css.title}
    value={item.title}
    onSubmit={val => onSubmit({...item, title: val})} />
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
  (state, ownProps) => {
    const { byId, items } = state.data
    const { id } = ownProps.params
    const item = byId[id]
    const children = item.children.length ? item.children.map(x => byId[x]) : item.children
    return {
      item: {...item, children}
    }
  },
  { updateItem, deleteData }
)(RecordView)