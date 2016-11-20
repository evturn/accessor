import React from 'react'
import Match from 'react-router/Match'
import Redirect from 'react-router/Redirect'

const MatchWhenAuthed = ({ component:Component, authed, ...rest }) => {
  return (
    <Match
      {...rest}
      render={props => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export default MatchWhenAuthed