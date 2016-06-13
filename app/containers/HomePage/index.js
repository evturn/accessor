import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import { createSelector } from 'reselect'

import {
  selectRepos,
  selectLoading,
  selectError,
  selectOhFuck,
} from 'containers/App/selectors'

import {
  selectUsername,
} from './selectors'

import { changeUsername } from './actions'
import { loadRepos } from '../App/actions'

import RepoListItem from 'containers/RepoListItem'
import Button from 'components/Button'
import H1 from 'components/H1'
import H2 from 'components/H2'
import List from 'components/List'
import ListItem from 'components/ListItem'
import LoadingIndicator from 'components/LoadingIndicator'
import GithubForm from './GithubForm'

import styles from './styles.css'

export class HomePage extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  openRoute = route => {
    this.props.changeRoute(route)
  }

  openFeaturesPage = _ => {
    this.openRoute('/features')
  }

  render() {
    return (
      <article>
        <div>
          <section className={`${styles.textSection} ${styles.centered}`}>
            <H1>X</H1>
          </section>
          <section className={styles.textSection}>
            <H2>␂</H2>
            <GithubForm />
            {(this.props.loading) ? (
              <List component={LoadingIndicator} />
            ) : (this.props.repos !== false) ? (
              <List items={this.props.repos} component={RepoListItem} />
            ) : null }
          </section>
          <Button handleRoute={this.openFeaturesPage}>Features</Button>
        </div>
      </article>
    )
  }
}

HomePage.propTypes = {
  changeRoute: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  changeRoute: url => dispatch(push(url)),
  dispatch
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
)(HomePage)
