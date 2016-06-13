import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Button from 'components/Button'
import H1 from 'components/H1'

export function NotFound(props) {
  return (
    <article>
      <H1>Page not found.</H1>
      <Button
        handleRoute={function redirect() {
          props.changeRoute('/')
        }}
      >
        Home
      </Button>
    </article>
  )
}

NotFound.propTypes = {
  changeRoute: React.PropTypes.func,
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: url => dispatch(push(url)),
  }
}

export default connect(null, mapDispatchToProps)(NotFound)
