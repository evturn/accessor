import React from 'react'
import Match from 'react-router/Match'
import Records from 'containers/Records'
import RecordView from 'containers/RecordView'
import MenuBar from 'containers/MenuBar'
import css from './style.css'

const Home = _ => {
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

export default Home
