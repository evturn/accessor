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

const SwitchSelect = ({ id, changeTarget }) => {
  return (
    <button
      className={css.select}
      onClick={_ => changeTarget(id)}>
      ➡︎
    </button>
  )
}

const SwitchControls = ({ current, expand, toggle, id, changeTarget, hide }) => {
  return (
    !current
      ? <div className={`${css.ctrls} ${hide ? css.hide : ''}`}>
          <SwitchExpand
            expand={expand}
            toggle={toggle}
          />
          <SwitchSelect
            id={id}
            changeTarget={changeTarget}
          />
        </div>
      : null
  )
}

const SwitchActions = ({ current, createNewRecord }) => {
  return (
    current
      ? <div className={css.btns}>
          <div className={css.clip}>📎</div>
        </div>
      : null
  )
}

const SwitchDrag = ({ current, hide }) => {
  return (
    current
      ? <div className={`${css.clip} ${hide ? css.hide : ''}`}>⋮</div>
      : null
  )
}

export {
  SwitchExpand,
  SwitchSelect,
  SwitchControls,
  SwitchActions,
  SwitchDrag,
}
