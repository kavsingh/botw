import React from 'react'
import PropTypes from 'prop-types'

export default function Panels({ orientation, children }) {
  return (
    <div className={`Panels ${orientation}`}>
      {children}
      <style jsx>{`
        .Panels {
          width: 100%;
          height: 100%;
          display: flex;
        }
        .Panels.portrait {
          flex-direction: column;
        }
      `}</style>
    </div>
  )
}

Panels.propTypes = {
  orientation: PropTypes.oneOf(['portrait', 'landscape']),
  children: PropTypes.node,
}

Panels.defaultProps = {
  orientation: 'portrait',
  children: [],
}
