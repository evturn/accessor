import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/Link'
import LoadingIndicator from 'components/LoadingIndicator'
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc'
import { deleteNode, sortEnd } from 'api/actions'
import css from './style.css'

export class Records extends Component {
  constructor(props) {
    super(props)

    this.state = {items: []}
    this.onSortEnd = ::this.onSortEnd
  }

  componentWillMount() {
    this.setState({items: this.props.items})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({items: nextProps.items})
  }

  onSortEnd({ oldIndex, newIndex }) {
    const { items } = this.props
    const sorted = arrayMove(items, oldIndex, newIndex)
    this.props.sortEnd(sorted.map((x, i) => ({...x, index: i})))
    this.setState({items: sorted})
  }

  render() {
    return (
      <div className={css.records}>
        {this.props.loading
          ? <LoadingIndicator />
          : <SortableList
            items={this.state.items}
            useDragHandle={true}
            onSortEnd={this.onSortEnd}
            deleteNode={this.props.deleteNode}
            helperClass={css.lift} />
        }
      </div>
    )
  }
}

const DragHandle = SortableHandle(_ => <span>::</span>)

const SortableItem = (
  SortableElement(({ deleteNode, ...x }) =>
    <li className={css.li}>
      <div className={css.remove} onClick={_ => deleteNode(x)} />
      <Link className={css.link} to={x.url}>
        <div className={css.record}>
          {x.title}
        </div>
      </Link>
      <DragHandle />
    </li>
  )
)

const SortableList = (
  SortableContainer(({ items, deleteNode }) =>
    <ul className={css.ul}>
      {items.map(x =>
        <SortableItem
          {...x}
          deleteNode={deleteNode}
          key={x.index}
          index={x.index} />
      )}
    </ul>
  )
)

export default connect(
  state => ({
    items: state.data.subtrees.map(x => x.unwrap()).map((x, i) => ({...x, index: i})),
    loading: state.auth.loading,
  }),
  { deleteNode, sortEnd }
)(Records)