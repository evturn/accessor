import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import {
  getRecords,
  recordSelected,
  navigateToRoot,
  selectCardView,
  selectTreeView,
} from 'containers/actions'

import H1 from 'components/H1'
import RecordMap from 'containers/RecordMap'

import css from './styles.css'

class Card extends Component {
  shouldPureComponentUpdate = shouldPureComponentUpdate

  componentDidMount() {
    this.props.loadInitialState()
  }

  render() {
    return (
      <div className={css.x}>

        <H1
          className={css.header}
          onClick={_ => this.props.navigateToRoot(this.props.target)}>
          ⧉
        </H1>

        <H1 className={css.perspective}>
          {this.props.treeView
            ? <span onClick={this.props.selectCardView}>⦶</span>
            : <span onClick={this.props.selectTreeView}>⊖</span>
          }
        </H1>

        {this.props.target
          ? <div className={css.nav}>
              <span
                className={css.back}
                onClick={_ => this.props.recordSelected(this.props.target.parent)}>
                ⬅︎
              </span>
            </div>
          : null
        }

        <RecordMap
          cardView={this.props.cardView}
          treeView={this.props.treeView}
          records={this.props.records}
        />

        {!this.props.target && this.props.cardView
          ? <button
              className={css.newRoot}
              onClick={_ => console.log('supperz mcdupperz')}>+</button>
          : null
        }

        <div className={css.status}>{this.props.status}</div>

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
  loadInitialState: PropTypes.func,
  recordSelected: PropTypes.func,
  target: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  cardView: PropTypes.bool,
  treeView: PropTypes.bool,
  status: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
}

const mapStateToProps = ({ global }) => ({
  target:   global.target,
  status:   global.status,
  loading:  global.loading,
  records:  global.records,
  cardView: global.cardView,
  treeView: global.treeView,
})

const mapDispatchToProps = dispatch => ({
  loadInitialState:    _ => dispatch(getRecords()),
  selectCardView:      _ => dispatch(selectCardView()),
  selectTreeView:      _ => dispatch(selectTreeView()),
  recordSelected:     id => dispatch(recordSelected(id)),
  navigateToRoot: target => dispatch(navigateToRoot(target)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)
