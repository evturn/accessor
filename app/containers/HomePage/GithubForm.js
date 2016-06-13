import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import { createSelector } from 'reselect'

import {
  selectRepos,
  selectLoading,
  selectError,
} from 'containers/App/selectors'

import { selectUsername } from './selectors'
import { changeUsername } from './actions'
import { loadRepos } from '../App/actions'

import Button from 'components/Button'
import H2 from 'components/H2'

import styles from './styles.css'

class GithubForm extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  render() {
    return (
      <form
        className={styles.usernameForm}
        onSubmit={this.props.submitForm}>
        <label htmlFor="username">␦
          <span className={styles.atPrefix}>@</span>
          <input
            id="username"
            className={styles.input}
            type="text"
            placeholder="evturn"
            value={this.props.username}
            onChange={this.props.onTippityTypity}
          />
        </label>
      </form>
    )
  }
}

GithubForm.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  submitForm: PropTypes.func,
  username: PropTypes.string,
  onTippityTypity: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  onTippityTypity: e => dispatch(changeUsername(e.target.value)),
  submitForm: e => {
    e.preventDefault()
    dispatch(loadRepos())
  },
  dispatch,
})

export default connect(
  createSelector(
    selectRepos(),
    selectUsername(),
    selectLoading(),
    selectError(),
    (repos, username, loading, error) => ({
      repos, username, loading, error
    })
  ),
  mapDispatchToProps
)(GithubForm)
