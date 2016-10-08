import React from 'react'
import Link from 'react-router/Link'

function A(props) {
  return (
    <a
      style={{ color: props.color || '#000' }}
      {...props}
    />
  )
}

export default A
