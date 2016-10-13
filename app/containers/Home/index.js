import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames/bind'
import Match from 'react-router/Match'
import Redirect from 'react-router/Redirect'
import Records from 'containers/Records'
import RecordView from 'containers/RecordView'
import MenuBar from 'containers/MenuBar'
import { logout } from 'api/actions'
import css from './style.css'

class Home extends Component {
  render() {
    return (
      <div className={css.root}>
        <Match
          exactly
          pattern="/"
          component={Records} />
        <MatchWithParams
          exactly
          pattern="/records/:id"
          component={RecordView}
          byId={this.props.byId} />
        <MenuBar />
      </div>
    )
  }
}

const MatchWithParams = ({ component: C, byId, ...rest }) => (
  <Match {...rest} render={props => {
    const item = byId[props.params.id]
    return <C {...item} />
  }} />
)

export default connect(
  state => ({
    open: state.ui.modal,
    byId: state.data.byId,
  }),
  { logout }
)(Home)
