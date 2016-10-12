import React from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import css from './style.css'

const LoadingIndicator = ({ loggedIn, c }) => {
  return (
    <div className={c('root')}>
      <div className={c('w', {light: !loggedIn, dark: loggedIn})}>
        <div className={c('w1')} />
        <div className={c('w2')} />
        <div className={c('w3')} />
        <div className={c('w4')} />
        <div className={c('w5')} />
      </div>
    </div>
  )
}

export default connect(
  state => ({
    loggedIn: !!state.isAuthenticated,
    c: classNames.bind(css),
  })
)(LoadingIndicator)