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

export {
  SwitchExpand,
  SwitchSelect,
}
