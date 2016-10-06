import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { firebaseAuth } from 'api'
import * as Actions from 'actions'
import LoadingIndicator from 'components/LoadingIndicator'
import css from './style.css'

export function Login(props) {
  const { githubAuth, twitterAuth } = props
  return (
    <div className="g-row sign-in">
      <div className="g-col">
        <h1 className="sign-in__heading">Accessor</h1>
        {!props.loading
          ? <div>
              <button
                className={css.btn}
                onClick={githubAuth}>
                Github
              </button>
              <button
                className={css.btn}
                onClick={twitterAuth}>
                Twitter
              </button>
            </div>
          : <LoadingIndicator />
        }
      </div>
    </div>
  )
}

Login.propTypes = {
  loading: PropTypes.bool,
  githubAuth: PropTypes.func.isRequired,
  twitterAuth: PropTypes.func.isRequired
}

export default connect(
  state => ({
    loading: state.loading
  }),
  Actions
)(Login)