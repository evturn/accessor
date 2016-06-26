import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import {
  SwitchExpand,
  SwitchSelect,
} from 'components/Switch'

import {
  recordSelected,
  recordHasChanged,
} from 'containers/Record/actions'

import css from './styles.css'

class Record extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expand: false,
      editing: false,
      formValue: '',
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

  toggleDescription() {
    this.setState({ expand: !this.state.expand})
  }

  edit(e) {
    e.charCode === 13
      ? this.submit()
      : this.setState({
          formValue: this['😵'].value
        })
  }

  getBackingInstance(input) {
    this['😵'] = input

    this['😵'] !== null
      ? this['😵'].focus()
      : null
  }

  createNewRecord() {
    this.setState({ editing: true })
  }

  submit() {
    this.state.formValue.length
      ? this.props.recordHasChanged({
          parent: { ...this.props },
          record: {
            title: this.state.formValue,
            more: `I can not shut the hell about ${this.state.formValue}!`
          }
        })
      : null

    this.setState({
      editing: false,
      formValue: '',
    })
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
                  toggle={::this.toggleDescription}
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
        </div>{
        derived.current
          ? <div className={css.btns}>
              <div
                className={css.clip}
                onClick={::this.createNewRecord}>＋</div>
              <div className={css.clip}>📎</div>
            </div>
          : null
        }
        <div className={classes.nested}>
          {this.state.editing
            ? <input
                style={{
                  border: 'none',
                  borderBottom: '1px solid #ccc',
                  fontFamily: 'Helvetica Neue',
                  fontWeight: 300,
                  fontSize: '14px',
                  margin: '20px 0 0 0',
                  height: '21px',
                  width: '100%',
                  transitionDuration: '0.3s'
                }}
                ref={::this.getBackingInstance}
                onBlur={::this.submit}
                onKeyPress={::this.edit}
                onChange={::this.edit}
              />
            : null
          }
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
  branches: PropTypes.object,
  recordSelected: PropTypes.func,
  target: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
}

const mapDispatchToProps = dispatch => ({
  recordSelected: id => dispatch(recordSelected(id)),
  recordHasChanged: ({ parent, record }) => dispatch(recordHasChanged({ parent, record }))
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
