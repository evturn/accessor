import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import shouldPureComponentUpdate from 'react-pure-render/function'

import {
  loadInitialState,
  navigateToRoot,
  changeTarget,
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
                onClick={_ => this.props.changeTarget(this.props.target.parent)}>
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

        <div className={css.status}>{this.props.message}</div>

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
  changeTarget: PropTypes.func,
  target: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  cardView: PropTypes.bool,
  treeView: PropTypes.bool,
  message: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
}

const mapStateToProps = state => ({
  target:   state.target,
  message:  state.message,
  loading:  state.loading,
  records:  state.records,
  cardView: state.cardView,
  treeView: state.treeView,
})

const mapDispatchToProps = dispatch => ({
  loadInitialState:     _ => dispatch(loadInitialState()),
  selectCardView:       _ => dispatch(selectCardView()),
  selectTreeView:       _ => dispatch(selectTreeView()),
  changeTarget:       id => dispatch(changeTarget(id)),
  navigateToRoot: target => dispatch(navigateToRoot(target)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)
