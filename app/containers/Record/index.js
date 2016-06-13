import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import styles from './styles.css'

const NestedRecords = ({ children }) => (
  <ul>{
    children.map((x, i) => (
      <Record key={i} {...x} />
    ))
  }</ul>
)

class Record extends Component {
  enterDetailView = id => {
    console.log(id)
  }

  render() {
    return (
      <li
        className={styles.li}
        onClick={_ => this.enterDetailView(this.props.id)}>
        <div className={styles.title}>{this.props.title}</div>
        <div className={styles.shut}>
          <div className={styles.more}>{this.props.more}</div>
          { this.props.children
              ? <NestedRecords children={this.props.children} />
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
}

export default Record
