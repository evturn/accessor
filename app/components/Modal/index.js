import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { closeModal } from 'api/actions'
import css from './style.css'

const c = classNames.bind(css)

export default function Modal({ open, onClose, children }) {
  return (
    <div className={c({ show: open, hide: !open })}>
      <div className={c('bar')}>
        <div className={c('close')} onClick={onClose} />
      </div>
      <div className={c('body')}>
        {children}
      </div>
    </div>
  )
}