import React from 'react'
import AddIcon from 'components/Icons/AddIcon'
import LinkIcon from 'components/Icons/LinkIcon'
import AttachFileIcon from 'components/Icons/AttachFileIcon'
import WidgetsIcon from 'components/Icons/WidgetsIcon'
import NoteIcon from 'components/Icons/NoteIcon'
import css from './style.css'

export const DashboardOptions = ({ menuVisible:open, selectOption, toggleOptions }) => {
  return (
    <div className={css.root}>
      <div className={css.wrap}>
        <div className={`${css.options} ${open ? css.on : css.off}`}>
          <ul className={css.ul}>
            <li
              onClick={selectOption('upload')}
              className={css.attach}>
              <AttachFileIcon className={css.icon} />
            </li>
            <li
              onClick={selectOption('write')}
              className={css.note}>
              <NoteIcon className={css.icon} />
            </li>
            <li
              onClick={selectOption('link')}
              className={css.link}>
              <LinkIcon className={css.icon} />
            </li>
            <li className={css.widgets}><WidgetsIcon className={css.icon} /></li>
          </ul>
        </div>
        <div
          onClick={toggleOptions}
          className={css.add}><AddIcon className={css.icon} /></div>
      </div>
    </div>
  )

}

export default DashboardOptions
