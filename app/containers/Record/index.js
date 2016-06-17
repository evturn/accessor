import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import styles from './styles.css'

class Record extends Component {
  setActive = id => {
    this.props.setActive(id)
  }

  moveRecord = ({ targetID, parentID }) => {
    this.props.moveRecord({ targetID, parentID })
  }

  render() {
    const activeClass = this.props.active === this.props.id
      ? styles.active
      : ''

    const branchClass = this.props.active === this.props.id
      || this.props.branch
      && this.props.branch
          .filter(x => x === this.props.id)[0]
            ? styles.open
            : styles.shut

    return (
      <li className={styles.li}>
        <div className={styles.title}>{this.props.title}</div>
        <button
          className={activeClass}
          onClick={e => this.setActive(this.props.id)}>⦿</button>
        { this.props.parent
            ? <button
                className={styles.move}
                onClick={e => this.moveRecord({ targetID: this.props.id, parentID: this.props.parent })}>
                ⊙
              </button>
            : null
        }
        <div className={branchClass}>
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
  setActive: PropTypes.func,
  dispatch: PropTypes.func,
}

export default connect(
  ({ global }) => ({
    active: global.active,
    branch: global.branch,
  })
)(Record)
