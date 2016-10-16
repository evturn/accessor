import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router/Redirect'
import LoadingIndicator from 'components/LoadingIndicator'
import Button from 'components/Button'
import { githubAuth, twitterAuth } from 'api/actions'
import css from './style.css'

export const Login = ({ githubAuth, twitterAuth, loading, isAuthenticated, redirect }) => {
  if (isAuthenticated) {
    return <Redirect to={redirect} />
  }

  return (
    <div className={css.root}>
      {loading
        ? <LoadingIndicator />
        : <div className={css.providers}>
            <Button onClick={githubAuth}>Github</Button>
            <Button onClick={twitterAuth}>Twitter</Button>
          </div>
      }
    </div>
  )
}

Login.propTypes = {
  loading: PropTypes.bool,
  redirect: PropTypes.string,
  githubAuth: PropTypes.func.isRequired,
  twitterAuth: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
    redirect: state.auth.redirect,
  }),
  { githubAuth, twitterAuth }
)(Login)