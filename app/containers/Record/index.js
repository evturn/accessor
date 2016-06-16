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
    const activeClass = this.props.active === this.props.id
      ? styles.active
      : ''

    const branchClass = this.props.branch &&
      this.props.branch
          .filter(x => x === this.props.id)[0]
            ? styles.branch
            : ''

    return (
      <li className={styles.li}>
        <div className={`${styles.title} ${activeClass} ${branchClass}`}>{this.props.title}</div>
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
