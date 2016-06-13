import React, { PropTypes } from 'react'

const Img = props => (
  <img className={props.className} src={props.src} />
)

Img.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default Img
