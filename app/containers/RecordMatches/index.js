import React from 'react'
import { connect } from 'react-redux'
import Match from 'react-router/Match'
import RecordView from 'containers/RecordView'
import { updateItem, deleteData } from 'api/actions'

export const RecordMatches = ({ updateItem, deleteData, byId }) => {
  return (
    <div>
      <Match pattern=":id" children={({ params, ...rest }) => {
        const item = byId[params.id]
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
    byId: state.data.byId
  }),
  { updateItem, deleteData }
)(RecordMatches)