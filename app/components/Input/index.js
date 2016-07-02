import React from 'react'

import css from './styles.css'

const Input = ({ className, current, creating, _ref, onFocus, value, onBlur, onChange, onKeyPress }) => {
  return (
    current
      ? <input
          className={`${css.standard} ${className ? className : ''}`}
          onBlur={onBlur}
          onKeyPress={onKeyPress}
          onChange={onChange}
          onFocus={onFocus}
          ref={creating ? _ref : null}
          value={creating ? value : ''}
        />
      : null
  )
}

const InputEditor = ({ className, updating, onBlur, _ref, value, onChange, onKeyPress, onClick, children }) => {
  return (
    <div className={className}>{
      updating
        ? <input
            className={`${css.editor} ${className}`}
            onBlur={onBlur}
            ref={_ref}
            onKeyPress={onKeyPress}
            onChange={onChange}
            defaultValue={value}
          />
        : <span
            className={css.text}
            onClick={onClick}>{value}</span>
      }
      {children}
    </div>
  )
}

export {
  Input,
  InputEditor,
}
