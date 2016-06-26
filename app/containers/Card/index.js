import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import {
  getRecords,
  recordSelected,
  navigateToRoot,
  selectCardView,
  selectTreeView,
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
        <H1 className={css.perspective}>{
          this.props.treeView
            ? <span onClick={this.props.selectCardView}>
                ⦶
              </span>
            : <span onClick={this.props.selectTreeView}>
                ⊖
              </span>
      }</H1>
        <div className={css.nav}>{
          this.props.target
            ? <span
                className={css.back}
                onClick={_ => this.props.recordSelected(this.props.target.parent)}>
                ⬅︎
              </span>
            : null
        }</div>
        <RecordMap
          cardView={this.props.cardView}
          treeView={this.props.treeView}
          records={this.props.records}
        />
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
  cardView: PropTypes.bool,
  treeView: PropTypes.bool,
}

const mapDispatchToProps = dispatch => ({
  getRecords: _ => dispatch(getRecords()),
  recordSelected: id => dispatch(recordSelected(id)),
  navigateToRoot: target => dispatch(navigateToRoot(target)),
  selectCardView: _ => dispatch(selectCardView()),
  selectTreeView: _ => dispatch(selectTreeView()),
})

export default connect(
  ({ global }) => ({
    records: global.records,
    target: global.target,
    loading: global.loading,
    cardView: global.cardView,
    treeView: global.treeView,
  }),
  mapDispatchToProps
)(Card)
