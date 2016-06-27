import React, { PropTypes } from 'react'

import 'sanitize.css/sanitize.css'

import Footer from 'components/Footer'

import css from './styles.css'

const App = props => (
  <div className={css.wrapper}>
    {props.children}
  </div>
)

App.propTypes = {
  children: PropTypes.node
}

export default App
