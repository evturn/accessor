import React from 'react'
import GoogleLogo from 'components/Icons/GoogleLogo'
import TwitterLogo from 'components/Icons/TwitterLogo'
import GithubLogo from 'components/Icons/GithubLogo'
import css from './style.css'

export const AuthButton = ({ service, onClick, className, style }) => {
  return (
    <button
      style={style}
      className={`${css.root} ${className ? className : ''}`}
      onClick={onClick}>
      <ProviderLogo service={service} />
    </button>
  )
}

const ProviderLogo = ({ service }) => {
  switch (service) {
    case 'google':
      return <GoogleLogo />
    case 'twitter':
      return <TwitterLogo />
    case 'github':
      return <GithubLogo />
  }
}

export default AuthButton
