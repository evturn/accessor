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

  computeStyles(x) {
    return {
      expand: x.current
        || x.expand && x.parent
        || x.expand && x.root
          ? `${css.more} ${css.open}`
          : css.shut,
      nested: x.current
        && x.children
          ? `${css.open} ${css.nest}`
          : '',
      title: x.root
        || x.parent
          ? `${css.title} ${css.open}`
          : x.current
            ? `${css.title} ${css.open} ${css.main}`
            : css.shut
    }
  }

  render() {
    const derived = {
      current: this.props.target.id === this.props.id,
      parent: this.props.target.id === this.props.parent,
      root: this.props.target === false && this.props.parent === false,
      expand: this.state.expand,
      children: this.props.children
    }
    const classes = this.computeStyles(derived)

    return (
      <li className={css.li}>
        <div className={classes.title}>
          {this.props.title}
          {derived.current
            ? <div className={css.clip}>⋮</div>
            : null
          }
          {!derived.current
            ? <div className={css.ctrls}>
                <SwitchExpand
                  expand={this.state.expand}
                  toggle={_ => this.setState({ expand: !this.state.expand})}
                />
                <SwitchSelect
                  id={this.props.id}
                  recordSelected={::this.props.recordSelected}
                />
              </div>
            : null
          }
        </div>
        <div className={classes.expand}>
          {this.props.more}
        </div>
        <div className={classes.nested}>
          {this.props.children}
        </div>{
        derived.current
          ? <div className={css.btns}>
              <div className={css.clip}>＋</div>
              <div className={css.clip}>📎</div>
            </div>
          : null
      }</li>
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
    target: global.target,
  }),
  mapDispatchToProps
)(Record)
