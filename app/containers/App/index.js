import React, { PropTypes } from 'react'

import 'sanitize.css/sanitize.css'

import Footer from 'components/Footer'
import Banner from './logo.jpg'
import A from 'components/A'

import styles from './styles.css'

const App = props => (
  <div className={styles.wrapper}>
    <A className={styles.logoWrapper} href="https://evturn.com">
      <img className={styles.logo} src={Banner} />
    </A>
    {props.children}
    <Footer />
  </div>
)

App.propTypes = {
  children: PropTypes.node
}

export default App
