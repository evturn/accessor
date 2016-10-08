import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import A from 'components/A'
import { launchModal } from 'api/actions'
import css from './style.css'

class MenuBar extends Component {
  render() {
    const { c, launchModal } = this.props
    return (
      <div className={c('menu')}>
        <ul className={c('ul')}>
          <li className={c('li')}>
            <A to="/">⏏</A>
          </li>
          <li className={c('li')}>◉</li>
          <li
            className={c('lg')}
            onClick={launchModal}>
            ＋
          </li>
          <li className={c('li')}>✆</li>
          <li className={c('li')}>☰</li>
        </ul>
      </div>
    )
  }
}

export default connect(
  state => ({
    c: classNames.bind(css),
  }),
  { launchModal }
)(MenuBar)