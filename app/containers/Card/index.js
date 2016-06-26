import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import {
  getRecords,
  recordSelected,
  navigateToRoot,
} from 'containers/Record/actions'

import H1 from 'components/H1'
import RecordMap from 'containers/RecordMap'

import css from './styles.css'

class Card extends Component {
  shouldPureComponentUpdate = shouldPureComponentUpdate

  componentDidMount() {
    this.props.getRecords()
  }

  render() {
    return (
      <div className={css.x}>
        <H1
          className={css.header}
          onClick={_ => this.props.navigateToRoot(this.props.target)}>
          ⧉
        </H1>
        <div className={css.nav}>{
          this.props.target
            ? <span
                className={css.back}
                onClick={_ => this.props.recordSelected(this.props.target.parent)}>
                ⬅︎
              </span>
            : null
        }</div>
        <RecordMap records={this.props.records} />
      </div>
    )
  }
}

Card.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  records: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  getRecords: PropTypes.func,
  recordSelected: PropTypes.func,
  target: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
}

const mapDispatchToProps = dispatch => ({
  getRecords: _ => dispatch(getRecords()),
  recordSelected: id => dispatch(recordSelected(id)),
  navigateToRoot: target => dispatch(navigateToRoot(target)),
})

export default connect(
  ({ global }) => ({
    records: global.records,
    target: global.target,
    loading: global.loading,
  }),
  mapDispatchToProps
)(Card)
