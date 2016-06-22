import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  SwitchExpand,
  SwitchSelect,
} from 'components/Switch'

import css from './styles.css'

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

  toggleExpand = expand => {
    this.setState({ expand })
  }

  render() {
    const {
      id,
      parent,
      target
    } = this.props

    const expandClass = target.id === id
      ? css.open
      : this.state.expand && target.id === parent
        ? css.open
        : target === false && parent === false && this.state.expand
          ? css.open
          : css.shut

    const targetTitle = target.id === id
      ? css.main
      : ''

    const titleClass = target === false
      ? target === false && parent === false
        ? css.open
        : css.shut
      : target.id === id || target.id === parent
        ? css.open
        : css.shut

      const nestClass = target.id === id
        && this.props.children
        ? css.nest
        : ''

    return (
      <li className={css.li}>
        <div className={`${css.title} ${titleClass} ${targetTitle}`}>
          {this.props.title}
          {target.id === id
            ? <div className={css.clip}>⋮</div>
            : null
          }
          {target.id !== id
            ? <div className={css.ctrls}>
                <SwitchExpand
                  expand={this.state.expand}
                  toggle={this.toggleExpand}
                />
                <SwitchSelect
                  id={id}
                  recordSelected={this.recordSelected}
                />
              </div>
            : null
          }
          </div>
          <div className={`${css.more} ${expandClass}`}>
            {this.props.more}
          </div>
          <div className={`${css.open} ${nestClass}`}>
            {this.props.children}
          </div>
          {targetTitle
            ? <div className={css.btns}>
                <div className={css.clip}>＋</div>
                <div className={css.clip}>📎</div>
              </div>
            : null
          }
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