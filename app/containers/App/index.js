import React, { PropTypes } from 'react'

import Card from 'containers/Card'

import 'sanitize.css/sanitize.css'

import css from './styles.css'

const App = props => (
  <div className={css.wrapper}>
    <Card />
  </div>
)

App.propTypes = {
  children: PropTypes.node
}

export default App
