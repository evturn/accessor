import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Link from 'react-router/Link'
import RecordView from 'containers/RecordView'
import LoadingIndicator from 'components/LoadingIndicator'
import { deleteNode, navigate } from 'api/actions'
import css from './style.css'

export class Records extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.navigate({
        location: this.context.history.location,
        action: this.context.history.action
      })
    }
  }

  render() {
    return (
      <div className={css.records}>
        {this.props.loading
          ? <LoadingIndicator />
          : <div>
              <RecordSubtrees
                items={this.props.items}
                deleteNode={this.props.deleteNode} />
              <MatchWithHistory
                exactly
                pattern={'/records/:id'}
                component={RecordView}
                stack={this.props.router} />
            </div>
        }
      </div>
    )
  }
}

const MatchWithHistory = ({ component: C, stack, ...rest }) => {
  return (
    <Match {...rest} render={props => {
      return (
        <div>
          {stack.map((x, i) => <C {...props} key={i} />)}
        </div>
      )
    }} />
  )
}

const RecordSubtrees = ({ items, deleteNode }) => {
  return (
    <ul className={css.ul}>
      {items.map(x =>
        <li key={x.id} className={css.li}>
          <div className={css.remove} onClick={_ => deleteNode(x)} />
          <Link className={css.link} to={x.url}>
            <div className={css.record}>
              {x.title}
            </div>
          </Link>
        </li>
      )}
    </ul>
  )
}

Records.contextTypes = {
  history: PropTypes.object,
}

export default connect(
  state => ({
    items: state.data.subtrees.map(x => x.unwrap()).map((x, i) => ({...x, index: i})),
    loading: state.auth.loading,
    router: state.router,
  }),
  { deleteNode, navigate }
)(Records)