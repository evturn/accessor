import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import styles from './styles.css'

class Record extends Component {
  recordSelected = id => {
    this.props.recordSelected(id)
  }

  moveRecord = ({ targetID, parentID }) => {
    this.props.moveRecord({ targetID, parentID })
  }

  render() {
    const {
      id,
      parent,
      target
    } = this.props

    const targetClass = target.id === id
      ? styles.open
      : styles.shut

    const targetTitle = target.id === id
      ? styles.main
      : ''

    const titleClass = target === false
      ? target === false && parent === false
        ? styles.open
        : styles.shut
      : target.id === id || target.id === parent
        ? styles.open
        : styles.shut

    return (
      <li className={styles.li}>
        <div className={`${styles.title} ${titleClass} ${targetTitle}`}>
          {this.props.title}
          {target.id !== id
            ? <button
                className={styles.select}
                onClick={e => this.recordSelected(id)}>
                ➡︎
              </button>
            : null
          }
          </div>
        <div className={`${styles.more} ${targetClass}`}>
          {this.props.more}
        </div>
        <div className={styles.open}>
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
  branch: PropTypes.array,
  active: PropTypes.number,
  branches: PropTypes.object,
  recordSelected: PropTypes.func,
  target: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
}

export default connect(
  ({ global }) => ({
    active: global.active,
    branch: global.branch,
    branches: global.branches,
    selected: global.selected,
    target: global.target,
  })
)(Record)
