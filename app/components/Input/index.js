import React from 'react'

import css from './styles.css'

const Input = ({ active, getBackingInstance, submit, edit }) => {
  return (
    active
      ? <input
          className={css.standard}
          ref={getBackingInstance}
          onBlur={submit}
          onKeyPress={edit}
          onChange={edit}
        />
      : null
  )
}

const InputEditor = ({ className, active, getBackingInstance, submit, edit, value, updateRecord, children }) => {
  return (
    <div className={className}>{
      active
        ? <input
            className={`${css.editor} ${className}`}
            ref={getBackingInstance}

            onKeyPress={edit}
            onChange={edit}
            defaultValue={value}
          />
        : <span
            className={css.text}
            onClick={updateRecord}>{value}</span>
      }
      {children}
    </div>
  )
}

export {
  Input,
  InputEditor,
}
