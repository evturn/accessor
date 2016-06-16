import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { setRecordActive } from 'containers/Record/actions'

import styles from './styles.css'

const NestedRecords = ({ children, setRecordActive }) => {
  return (
    <ul>{
      children.map((x, i) => (
        <Record key={i} {...x} setRecordActive={setRecordActive}/>
      ))
    }</ul>
  )
}

class Record extends Component {
  render() {
    return (
      <li
        className={styles.li}
        onClick={e => this.props.setRecordActive(e, this.props.id)}>
        <div className={styles.title}>{this.props.title}</div>
        <div className={styles.open}>
          <div className={styles.more}>{this.props.more}</div>
          { this.props.children
              ? <NestedRecords
                  setRecordActive={this.props.setRecordActive}
                  children={this.props.children} />
              : null
          }
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
}

export default connect(
  ({ global }) => ({ active: global.active }),
  dispatch => ({
    setRecordActive: (e, id) => dispatch(setRecordActive(e, id))
  })
)(Record)
