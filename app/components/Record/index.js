import React, { PropTypes } from 'react'

import List from 'components/List'
import styles from './styles.css'

const Record = ({ record }) => {
  return (
    <li className={styles.li}>
      <div className={styles.title}>{record.title}</div>
      <div className={styles.more}>{record.more}</div>
      {record.children ? <RecordMap records={record.children} /> : null}
    </li>
  )
}

const RecordMap = ({ records }) => {
  return (
    <ul>{records.map((x, i) => {
      return <Record
        key={i}
        record={x}
      />
    })}</ul>
  )
}

export {
  Record,
  RecordMap
}
