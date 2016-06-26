import React, { PropTypes } from 'react'

import 'sanitize.css/sanitize.css'

import Footer from 'components/Footer'

import styles from './styles.css'

const App = props => (
  <div className={styles.wrapper}>
    {props.children}
  </div>
)

App.propTypes = {
  children: PropTypes.node
}

export default App
