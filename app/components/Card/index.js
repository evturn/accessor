import React from 'react'
import css from './style.css'

export const Card = ({ header, children }) => {
  return (
    <div className={css.root}>
      <div className={css.header}>{header}</div>
      <div className={css.card}>
        {children}
      </div>
    </div>
  )
}

export default Card
