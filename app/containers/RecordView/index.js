import React, { Component } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/Link'
import Input from 'components/Input'
import { updateItem, deleteNode } from 'api/actions'
import css from './style.css'

const RecordView = ({ updateItem, deleteNode, item }) => {
  return (
    <div className={css.view}>
      <RecordNav {...item} onDelete={_ => deleteNode(item.branchIds)} />
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
        <div
          className={css.delete}
          onClick={onDelete} />
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
  if (!items) { return null }
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
    const { hashmap } = state.data
    const { id } = ownProps.params
    return {
      item: hashmap[id].unwrap()
    }
  },
  { updateItem, deleteNode }
)(RecordView)