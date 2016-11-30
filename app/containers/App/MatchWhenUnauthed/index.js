import React from 'react'
import Match from 'react-router/Match'
import Redirect from 'react-router/Redirect'

const MatchWhenUnauthed = ({ component:Component, authed, ...rest }) => {
  return (
    <Match
      {...rest}
      render={props => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />} />
  )
}

export default MatchWhenUnauthed