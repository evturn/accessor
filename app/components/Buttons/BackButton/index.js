import React from 'react'
import Link from 'react-router/Link'
import ArrowBackIcon from 'components/Icons/ArrowBack'
import css from './style.css'

export const BackButton = ({ to, onClick, className }) => {
  const btnClass = `${css.btn} ${className ? className : ''}`
  return (
    <div onClick={onClick}>
      {to
        ? <Link to={to}>
            <ArrowBackIcon className={btnClass} />
          </Link>
        : <ArrowBackIcon className={btnClass} />}
    </div>
  )
}

export default BackButton
