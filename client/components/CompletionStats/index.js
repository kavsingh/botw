import React from 'react'
import PropTypes from 'prop-types'

export default function CompletionStats({ totalCount, completedCount }) {
  return (
    <div className="root">
      <div className="remaining">{
        totalCount - completedCount
      } remaining</div>
      <div className="counts">
        <span className="completed">{
          completedCount
        }</span> / <span className="total">{
          totalCount
        }</span> complete
      </div>
      <style jsx>{`
        .root {
          display: flex;
          align-items: center;
          padding: 1em 1.6em;
        }
        .remaining {
          color: white;
          font-weight: 600;
          font-size: 1.2em;
          margin-right: 0.8em;
        }
        .counts .completed {
          color: white;
        }
      `}</style>
    </div>
  )
}

CompletionStats.propTypes = {
  totalCount: PropTypes.number,
  completedCount: PropTypes.number,
}

CompletionStats.defaultProps = {
  totalCount: 0,
  completedCount: 0,
}
