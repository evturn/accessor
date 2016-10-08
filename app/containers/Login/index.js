import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router/Redirect'
import LoadingIndicator from 'components/LoadingIndicator'
import Button from 'components/Button'
import { githubAuth, twitterAuth } from 'api/actions'
import css from './style.css'

export function Login(props) {
  if (props.redirect) {
    return <Redirect to="/" />
  }

  return (
    <div className={css.root}>
      {props.loading
        ? <LoadingIndicator />
        : <div className={css.providers}>
            <Button onClick={props.githubAuth}>Github</Button>
            <Button onClick={props.twitterAuth}>Twitter</Button>
          </div>
      }
    </div>
  )
}

Login.propTypes = {
  loading: PropTypes.bool,
  githubAuth: PropTypes.func.isRequired,
  twitterAuth: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    loading: state.loading || state.isAuthenticated === null,
    redirect: !!state.isAuthenticated,
  }),
  { githubAuth, twitterAuth }
)(Login)