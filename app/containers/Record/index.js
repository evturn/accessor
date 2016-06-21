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
    const rootLevel = this.props.target === false
    const rootRecord = this.props.parent === false
    const targetRecord = this.props.target.id === this.props.id
    const targetChild = this.props.target.id === this.props.parent

    const targetVisibility = targetRecord
      ? styles.open
      : styles.shut

    const titleVisibility = rootLevel
      ? rootLevel && rootRecord
        ? styles.open
        : styles.shut
      : targetRecord || targetChild
        ? styles.open
        : styles.shut

    return (
      <li className={styles.li}>
        <div className={`${styles.title} ${titleVisibility}`}>
          {this.props.title}
          <button onClick={e => this.recordSelected(this.props.id)}>
            ➡︎
          </button>
        </div>
        <div className={`${styles.more} ${targetVisibility}`}>
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
