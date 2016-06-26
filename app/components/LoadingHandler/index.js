import React from 'react'
import List from 'components/List'
import LoadingIndicator from 'components/LoadingIndicator'

const LoadingHandler = ({ loading }) => (
  loading
    ? <List component={LoadingIndicator} />
    : null
)

export default LoadingHandler
