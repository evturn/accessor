import React from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import RecordView from 'containers/RecordView'
import { updateItem, deleteData } from 'api/actions'

export const RecordMatches = ({ updateItem, deleteData, branches }) => {
  return (
    <div>
      <Match pattern=":id" children={({ params, ...rest }) => {
        const item = branches[params.id].filter(x => x.id === params.id)[0]
        return (
          <RecordView
            {...item}
            key={item.id}
            updateItem={updateItem}
            deleteData={deleteData} />
        )
      }} />
    </div>
  )
}

export default connect(
  state => ({
    branches: state.data.branches
  }),
  { updateItem, deleteData }
)(RecordMatches)