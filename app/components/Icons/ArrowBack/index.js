import React from 'react'

export const ArrowBack = ({ className, style }) => {
  const size = !className ? {width: '24px', height: '24px'} : style
  return (
    <svg
      className={className}
      style={size}
      fill="#FFFFFF"
      viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
  )
}

export default ArrowBack
