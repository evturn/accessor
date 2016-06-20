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
    const isSelected = this.props.selected.filter(x => x === this.props.id)[0]
    const activeClass = isSelected
      ? styles.active
      : ''

    const branchClass = isSelected
      ? styles.open
      : styles.shut

    return (
      <li className={styles.li}>
        <div className={styles.title}>{this.props.title}</div>
        <button
          className={activeClass}
          onClick={e => this.recordSelected(this.props.id)}>
          ⦿
        </button>{
          this.props.parent
            ? <button
                className={styles.move}
                onClick={e => this.moveRecord({ targetID: this.props.id, parentID: this.props.parent })}>
                ▵
              </button>
            : null
        }<div className={branchClass}>
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
  branch: PropTypes.array,
  active: PropTypes.number,
  recordSelected: PropTypes.func,
  dispatch: PropTypes.func,
}

export default connect(
  ({ global }) => ({
    active: global.active,
    branch: global.branch,
    selected: global.selected,
  })
)(Record)
