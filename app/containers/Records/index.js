import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/Link'
import LoadingIndicator from 'components/LoadingIndicator'
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc'
import { deleteNode, openModal } from 'api/actions'
import css from './style.css'

export class Records extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
    this.onSortEnd = ::this.onSortEnd
  }

  componentWillReceiveProps() {
    const { items } = this.state
    this.setState({ items })
  }

  onSortEnd({ oldIndex, newIndex }) {
    const { items } = this.state
    this.setState({
      items: arrayMove(items, oldIndex, newIndex)
    })
  }

  render() {
    return (
      <div className={css.records}>
        {this.props.loading
          ? <LoadingIndicator />
          : <SortableList
            items={this.state.items}
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
      <div className={css.remove} onClick={_ => x.deleteNode(x)} />
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
      {items.map((x, i) =>
        <SortableItem
          {...x}
          deleteNode={deleteNode}
          key={`item-${i}`}
          index={i} />
      )}
    </ul>
  )
)

export default connect(
  state => ({
    items: state.data.subtrees.map(x => x.unwrap()),
    loading: state.auth.loading,
  }),
  { deleteNode }
)(Records)