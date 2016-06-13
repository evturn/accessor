/* eslint-disable react/prefer-stateless-function */

import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { selectCurrentUser } from 'containers/App/selectors'

import ListItem from 'components/ListItem'
import IssueIcon from 'components/IssueIcon'
import A from 'components/A'

import styles from './styles.css'

export class RepoListItem extends React.Component {
  render() {
    const item = this.props.item
    let nameprefix = ''
    if (item.owner.login !== this.props.currentUser) {
      nameprefix = `${item.owner.login}/`
    }

    const content = (
      <div className={styles.linkWrapper}>
        <A
          className={styles.linkRepo}
          href={item.html_url}
          target="_blank"
        >
          {nameprefix + item.name}
        </A>
        <A
          className={styles.linkIssues}
          href={`${item.html_url}/issues`}
          target="_blank"
        >
          <IssueIcon className={styles.issueIcon} />
          {item.open_issues_count}
        </A>
      </div>
    )

    return (
      <ListItem key={`repo-list-item-${item.full_name}`} content={content} />
    )
  }
}

RepoListItem.propTypes = {
  item: React.PropTypes.object,
  currentUser: React.PropTypes.string,
}

export default connect(createSelector(
  selectCurrentUser(),
  currentUser => ({ currentUser })
))(RepoListItem)
