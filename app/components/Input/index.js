import React from 'react'

import css from './styles.css'

const Input = ({ value, onChange, onBlur, onKeyPress, ref }) => {
  return (
    <input
      style={{
        border: 'none',
        borderBottom: '1px solid #ccc',
        fontFamily: 'Helvetica Neue',
        fontWeight: 300,
        fontSize: '14px',
        margin: '20px 0 0 0',
        height: '21px',
        width: '100%',
        transitionDuration: '0.3s'
      }}
      type="text"
      ref={i => ref = i}
      onBlur={onBlur}
      onChange={onChange}
      onKeyPress={onKeyPress}
      value={value}
   />
  )
}

export default Input
