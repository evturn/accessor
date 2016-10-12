import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TransitionMotion, spring } from 'react-motion'
import Match from 'react-router/Match'
import Link from 'react-router/Link'
import css from './style.css'

export const RecordView = ({ children, title, back }) => {
  return (
    <div>
      <div className={css.bar}>
        <div className={css.title} />
        <div className={css.close}>
          <Link className={css.back} to={back}>Back</Link>
        </div>
      </div>
      <div className={css.body}>
        <input className={css.input} defaultValue={title} />
        <div className={css.label} />

        <div className={css.items}>
          {children.map(x =>
            <div key={x.id} className={css.child}>
              <Link className={css.to} to={x.url}>{x.title}</Link>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

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

export const MatchedRecords = ({ items, ...rest }) => {
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
})(MatchedRecords)