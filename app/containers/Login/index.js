import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router/Redirect'
import LoadingIndicator from 'components/LoadingIndicator'
import Button from 'components/Button'
import H1 from 'components/H1'
import * as Actions from 'api/actions'
import css from './style.css'

export function Login(props) {
  return (
    <div>
      {props.isAuthenticated === null
        ? <LoadingIndicator />
        : props.isAuthenticated
          ? <Redirect to="/" />
          : <div className={css.login}>
              <H1>Accessor</H1>
                {!props.loading
                  ? <div>
                      <Button onClick={props.githubAuth}>Github</Button>
                      <Button onClick={props.twitterAuth}>Twitter</Button>
                    </div>
                  : <LoadingIndicator />
                }
            </div>
      }
    </div>
  )
}

Login.propTypes = {
  loading: PropTypes.bool,
  githubAuth: PropTypes.func.isRequired,
  twitterAuth: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

export default connect(
  state => ({
    loading: state.loading,
    isAuthenticated: state.isAuthenticated,
  }),
  Actions
)(Login)