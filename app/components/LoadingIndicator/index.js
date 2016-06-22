import React from 'react'

import css from './styles.css'

const LoadingIndicator = _ => (
  <div className={css.loading}>
    <div className={css['sk-fading-circle']}>
      <div className={css.skCircle}></div>
      <div className={css['sk-circle2']}></div>
      <div className={css['sk-circle3']}></div>
      <div className={css['sk-circle4']}></div>
      <div className={css['sk-circle5']}></div>
      <div className={css['sk-circle6']}></div>
      <div className={css['sk-circle7']}></div>
      <div className={css['sk-circle8']}></div>
      <div className={css['sk-circle9']}></div>
      <div className={css['sk-circle10']}></div>
      <div className={css['sk-circle11']}></div>
      <div className={css['sk-circle12']}></div>
    </div>
  </div>
)

export default LoadingIndicator
