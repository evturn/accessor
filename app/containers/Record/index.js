import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import {
  SwitchExpand,
  SwitchSelect,
} from 'components/Switch'

import {
  recordSelected,
} from 'containers/Record/actions'

import css from './styles.css'

class Record extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expand: false,
    }
  }

  shouldPureComponentUpdate = shouldPureComponentUpdate

  getContainerStyle(current, parent, root) {
    return root
      || parent
        ? `${css.title} ${css.open}`
        : current
          ? `${css.title} ${css.open} ${css.main}`
          : css.shut
  }

  toggleExpand(expand) {
    this.setState({ expand })
  }

  createDescriptionComponent(current, parent, root) {
    return ({ expand, more }) => {
      const expandClass = current
        || expand && parent
        || expand && root
          ? `${css.more} ${css.open}`
          : css.shut

      return (
        <div className={expandClass}>
          {more}
        </div>
      )
    }
  }

  createSwitchControlsComponent(current) {
    return ({ expand, id, toggle, selected }) => (
      !current
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
  }

  createNestedRecordsComponent(current) {
    return ({ children }) => {
      const nestClass = current
        && children
          ? `${css.open} ${css.nest}`
          : ''
      return (
        <div className={nestClass}>
          {children}
        </div>
      )
    }
  }

  render() {
    const CURRENT_TARGET = this.props.target.id === this.props.id
    const PARENT_IS_TARGET = this.props.target.id === this.props.parent
    const ROOT_IS_TARGET = this.props.target === false && this.props.parent === false

    const NestedRecords = this.createNestedRecordsComponent(CURRENT_TARGET)
    const SwitchControls = this.createSwitchControlsComponent(CURRENT_TARGET)
    const RecordDescription = this.createDescriptionComponent(CURRENT_TARGET, PARENT_IS_TARGET, ROOT_IS_TARGET)
    const titleClass = this.getContainerStyle(CURRENT_TARGET, PARENT_IS_TARGET, ROOT_IS_TARGET)

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
            toggle={::this.toggleExpand}
            selected={::this.props.recordSelected}
          />
        </div>
        <RecordDescription
          expand={this.state.expand}
          more={this.props.more}
        />
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

const mapDispatchToProps = dispatch => ({
  recordSelected: id => dispatch(recordSelected(id)),
})

export default connect(
  ({ global }) => ({
    active: global.active,
    branch: global.branch,
    branches: global.branches,
    selected: global.selected,
    target: global.target,
  }),
  mapDispatchToProps
)(Record)
