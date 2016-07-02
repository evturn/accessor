import React from 'react'

import css from './styles.css'

const Input = ({ current, creating, getBackingInstance, creatingRecord, value, submit, edit }) => {
  return (
    current
      ? <input
          className={css.standard}
          onBlur={submit}
          onKeyPress={edit}
          onChange={edit}
          onFocus={creatingRecord}
          ref={creating ? getBackingInstance : null}
          value={creating ? value : ''}
        />
      : null
  )
}

const InputEditor = ({ className, updating, submit, getBackingInstance, edit, value, updatingRecord, children }) => {
  return (
    <div className={className}>{
      updating
        ? <input
            className={`${css.editor} ${className}`}
            onBlur={submit}
            ref={getBackingInstance}
            onKeyPress={edit}
            onChange={edit}
            defaultValue={value}
          />
        : <span
            className={css.text}
            onClick={updatingRecord}>{value}</span>
      }
      {children}
    </div>
  )
}

export {
  Input,
  InputEditor,
}
