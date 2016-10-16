import React from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import Redirect from 'react-router/Redirect'
import Records from 'containers/Records'
import RecordView from 'containers/RecordView'
import MenuBar from 'containers/MenuBar'
import css from './style.css'

const Home = ({ redirect }) => {
  if (redirect) {
    return <Redirect to={redirect} />
  }
  return (
    <div className={css.root}>
      <Match
        exactly
        pattern="/"
        component={Records} />
      <Match
        exactly
        pattern="/records/:id"
        component={RecordView} />
      <MenuBar />
    </div>
  )
}

export default connect(
  state => ({
    redirect: state.auth.redirect
  })
)(Home)
