import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TransitionMotion, spring } from 'react-motion'
import Match from 'react-router/Match'
import RecordView from 'containers/RecordView'

const view = {
  position: 'fixed',
  backgroundColor: '#fff',
  top: 0,
  bottom: 0,
  left: 'auto',
  height: '100%',
  transition: '0.3s',
  right: '-100vh',
}

export const RecordMatches = ({ items, ...rest }) => {
  const styles = items.map((x, i)=> ({
      key: x.id,
      data: x,
      style: { right: 0 },
    }))
  return (
    <Match {...rest} children={({ matched, ...props}) => (
      <TransitionMotion
        willEnter={_ => ({ right: spring(0) })}
        styles={styles}>
        {interpolatedStyles => (
          <div>
            {interpolatedStyles.map((config, i) => (
              <div
                key={config.key}
                style={{ ...view, ...config.style, zIndex: 100 - i }}>
                <RecordView {...config.data} />
              </div>
            ))}
          </div>
        )}
      </TransitionMotion>
    )}/>
  )
}

export default connect(
  (state, ownProps) => {
    return {
      items: state.data.branches[ownProps.params.id]
    }
  }
)(RecordMatches)