import React from 'react'
import Match from 'react-router/Match'
import Dashboard from 'containers/Dashboard'
import Settings from 'containers/Settings'

export const Home = props => {
  return (
    <div>
      <Match pattern='/dashboard' component={Dashboard} />
      <Match pattern='/settings' component={Settings} />
    </div>
  )
}

export default Home