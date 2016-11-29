import React from 'react'
import css from './style.css'

export const DashboardList = ({ records, onClick }) => {
  return (
    <div className={css.root}>
      {records.map(x =>
        <div
          onClick={_ => onClick(x.id)}
          className={css.item}
          key={x.id}>
          {x.data.map(y =>
            <div
              className={css.img}
              key={y.id}
              style={{backgroundImage: `url(${y.url})`}} />
          )}
        </div>
      )}
    </div>
  )
}

export default DashboardList
