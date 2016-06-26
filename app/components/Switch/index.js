import React from 'react'

import css from './styles.css'

const SwitchExpand = ({ expand, toggle }) => {
  return (
    <button
      className={css.select}
      onClick={toggle}>
      <span>{expand ? `⬆` : `⬇`}</span>
    </button>
  )
}

const SwitchSelect = ({ id, recordSelected }) => {
  return (
    <button
      className={css.select}
      onClick={_ => recordSelected(id)}>
      ➡︎
    </button>
  )
}

const SwitchControls = ({ current, expand, toggle, id, recordSelected }) => {
  return (
    !current
      ? <div className={css.ctrls}>
          <SwitchExpand
            expand={expand}
            toggle={toggle}
          />
          <SwitchSelect
            id={id}
            recordSelected={recordSelected}
          />
        </div>
      : null
  )
}

const SwitchActions = ({ current, createNewRecord}) => {
  return (
    current
      ? <div className={css.btns}>
          <div
            className={css.clip}
            onClick={createNewRecord}>＋</div>
          <div className={css.clip}>📎</div>
        </div>
      : null
  )
}

export {
  SwitchExpand,
  SwitchSelect,
  SwitchControls,
  SwitchActions,
}
