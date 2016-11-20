import React from 'react'
import { connect } from 'react-redux'
import css from './style.css'

export const Home = props => {
  return (
    <div className={css.root}>
      <div>Sup dog.</div>
    </div>
  )
}

export default Home
