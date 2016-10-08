import React from 'react'
import css from './style.css'

function H1(props) {
  return (
    <h1 className={css.h1} { ...props } />
  )
}

export default H1
