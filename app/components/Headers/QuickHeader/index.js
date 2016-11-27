import React from 'react'
import css from './style.css'

export const QuickHeader = ({ text, className, style }) => {
  return (
    <div
      style={style}
      className={`${css.root} ${className ? className : ''}`}>{text}</div>
  )
}

export default QuickHeader