import React from 'react'
import PropTypes from 'prop-types'

export default function Panel({ type, children }) {
  return (
    <div className={type}>
      {children}
      <style jsx>{`
        .fit {
          flex: 0 0 auto;
        }
        .stretch {
          flex: 1 0;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

Panel.propTypes = {
  type: PropTypes.oneOf(['fit', 'stretch']),
  children: PropTypes.node,
}

Panel.defaultProps = {
  type: 'stretch',
  children: [],
}
