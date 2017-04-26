import React from 'react'
import PropTypes from 'prop-types'

export default function ContentPage({
  children,
  contentStyle,
  backgroundStyle,
}) {
  return (
    <div className="root">
      <div className="content" style={contentStyle}>
        {children}
      </div>
      <div className="background" style={backgroundStyle} />
      <style jsx>{`
        .root {
          width: 100%;
          height: 100%;
        }
        .content,
        .background {
          position: absolute;
        }
        .content {
          padding: 1em;
          z-index: 2;
          top: 3vmin;
          right: 3vmin;
          bottom: 3vmin;
          left: 3vmin;
          background-color: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.16);
        }
        .background {
          background-repeat: no-repeat
          background-position: center;
          background-size: cover;
          filter: blur(3px);
          top: -3px;
          right: -3px;
          bottom: -3px;
          left: -3px;
        }
      `}</style>
    </div>
  )
}

ContentPage.propTypes = {
  children: PropTypes.node,
  contentStyle: PropTypes.shape({}),
  backgroundStyle: PropTypes.shape({}),
}

ContentPage.defaultProps = {
  children: [],
  contentStyle: {},
  backgroundStyle: {},
}
