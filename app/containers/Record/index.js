import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { setRecordActive } from 'containers/Record/actions'

import styles from './styles.css'

class Record extends Component {
  constructor(props) {
    super(props)
    // this.setRecordActive = props.setRecordActive.bind(this)
  }

  setActive = id => {
    this.props.setActive(id)
  }

  render() {
    return (
      <li className={styles.li}>
        <div className={styles.title}>{this.props.title}</div>
        <button onClick={e => this.setActive(this.props.id)}>Clickity {this.props.id}</button>
        <div className={styles.open}>
          <div className={styles.more}>{this.props.more}</div>
          {this.props.children}
        </div>
      </li>
    )
  }
}


Record.PropTypes = {
  title: PropTypes.string,
  more: PropTypes.string,
  id: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool
  ]),
  parent: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ]),
  active: PropTypes.array,
  setActive: PropTypes.func,
  dispatch: PropTypes.func,
}

export default connect(
  ({ global }) => ({
    active: global.active,
    branch: global.branch,
  })
)(Record)
