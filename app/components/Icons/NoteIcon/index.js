import React from 'react'

export const NoteIcon = ({ className, style }) => {
  const size = !className ? {width: '24px', height: '24px'} : style
  return (
    <svg
      className={className}
      style={size}
      fill="#FFFFFF"
      viewBox="0 0 24 24">
      <path d="M22 10l-6-6H4c-1.1 0-2 .9-2 2v12.01c0 1.1.9 1.99 2 1.99l16-.01c1.1 0 2-.89 2-1.99v-8zm-7-4.5l5.5 5.5H15V5.5z"/>
      <path d="M0 0h24v24H0V0z" fill="none"/>
    </svg>
  )
}

export default NoteIcon