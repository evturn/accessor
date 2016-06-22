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
      expand: false,
    }
  }

  recordSelected = id => {
    this.props.recordSelected(id)
  }

  toggleExpand = expand => {
    this.setState({ expand })
  }

  render() {
    const CURRENT_TARGET = this.props.target.id === this.props.id
    const PARENT_IS_TARGET = this.props.target.id === this.props.parent
    const ROOT_IS_TARGET = this.props.target === false && this.props.parent === false

    const titleClass = ROOT_IS_TARGET
      || PARENT_IS_TARGET
        ? `${css.title} ${css.open}`
        : CURRENT_TARGET
          ? `${css.title} ${css.open} ${css.main}`
          : css.shut

    const NestedRecords = ({ children }) => {
      const nestClass = CURRENT_TARGET
        && children
          ? `${css.open} ${css.nest}`
          : ''
      return (
        <div className={nestClass}>
          {children}
        </div>
      )
    }

    const SwitchControls = ({ expand, id, toggle, selected }) => (
      !CURRENT_TARGET
        ? <div className={css.ctrls}>
            <SwitchExpand
              expand={expand}
              toggle={toggle}
            />
            <SwitchSelect
              id={id}
              recordSelected={selected}
            />
          </div>
        : null
    )

    const RecordDescription = ({ expand }) => {
      const expandClass = CURRENT_TARGET
        || expand && PARENT_IS_TARGET
        || expand && ROOT_IS_TARGET
          ? `${css.more} ${css.open}`
          : css.shut

      return (
        <div className={expandClass}>
          {this.props.more}
        </div>
      )
    }

    return (
      <li className={css.li}>
        <div className={titleClass}>
          {this.props.title}
          {CURRENT_TARGET
            ? <div className={css.clip}>⋮</div>
            : null
          }
          <SwitchControls
            id={this.props.id}
            expand={this.state.expand}
            toggle={this.toggleExpand}
            selected={this.recordSelected}
          />
        </div>
        <RecordDescription expand={this.state.expand} />
        <NestedRecords children={this.props.children} />
        {CURRENT_TARGET
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