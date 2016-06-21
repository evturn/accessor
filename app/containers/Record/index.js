import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import styles from './styles.css'

class Record extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expand: false
    }
  }
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

    const expandClass = target.id === id
      ? styles.open
      : this.state.expand && target.id === parent
        ? styles.open
        : target === false && parent === false && this.state.expand
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

      const nestClass = target.id === id
        && this.props.children
        ? styles.nest
        : ''

    return (
      <li className={styles.li}>
          <div className={`${styles.title} ${titleClass} ${targetTitle}`}>
            {this.props.title}
            {target.id !== id
              ? <div className={styles.ctrls}>
                  <button
                    className={styles.select}
                    onClick={_ => this.setState({ expand: !this.state.expand})}>
                    <span>{this.state.expand ? `⬆` : `⬇`}</span>
                  </button>
                  <button
                    className={styles.select}
                    onClick={e => this.recordSelected(id)}>
                    ➡︎
                  </button>
                </div>
              : null
            }
            </div>
          <div className={`${styles.more} ${expandClass}`}>
            {this.props.more}
          </div>
          <div className={`${styles.open} ${nestClass}`}>
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
