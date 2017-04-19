import React from 'react'
import PropTypes from 'prop-types'

export default function ListItem({
  title,
  description,
  icon,
  active,
  onClick,
  style,
  activeHoverMessage,
  inactiveHoverMessage,
}) {
  return (
    <button
      className={`root ${active ? 'active' : 'inactive'}`}
      style={style}
      onClick={onClick}
    >
      <div className="content">
        {icon
          ? (
            <div className="iconContainer">
              {icon({ height: '100%', fill: 'rgba(209, 212, 192, 1)' })}
            </div>
          )
          : ''
        }
        <div className="mainContent">
          <div className="title">{title}</div>
          <div className="description">{description}</div>
        </div>
        <div className="hoverMessage">
          {active ? activeHoverMessage : inactiveHoverMessage}
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse {
          from {
            box-shadow: 0px 0px 20px rgba(209, 226, 192, 0.6);
          }
          to {
            box-shadow: 0px 0px 24px rgba(209, 226, 192, 1);
          }
        }
        .root {
          padding: 0;
          cursor: pointer;
          display: block;
          font: inherit;
          highlight: none !important;
          outline: 1px solid rgba(0, 0, 0, 0.8);
          border: 2px solid rgba(24, 36, 34, 0.8);
          background: transparent;
          width: 100%;
          box-sizing: inherit;
          text-align: inherit;
          transition:
            border-color 0.2s ease-out;
          position: relative;
          z-index: 1;
        }
        .root:hover {
          animation: pulse 1.6s infinite alternate;
          border-color: rgba(209, 212, 192, 0.96);
          z-index: 2;
        }
        .content {
          padding: 0.4em 0.6em;
          background-color: rgba(0, 0, 0, 0.8);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .iconContainer {
          height: 2em;
          margin-right: 0.6em;
        }
        .title {
          color: rgba(209, 212, 192, 1);
          font-size: 1.2em;
          font-weight: 600;
        }
        .description {
          font-size: 0.8em;
          color: #E1C823;
        }
        .hoverMessage {
          position: absolute;
          display: flex;
          align-items: center;
          right: 0;
          bottom: 0;
          top: 0;
          font-size: 0.8em;
          padding: 1em;
          color: rgba(209, 226, 192, 0.6);
          pointer-events: none;
          background-color: rgba(0, 0, 0, 0.4);
          transform: translateX(20%);
          opacity: 0;
          transition: transform 0.2s ease-out;
        }
        .active .hoverMessage {
          text-shadow: 0 0 2px rgba(209, 226, 192, 1);
          color: rgba(209, 226, 192, 1);
        }
        .root:hover .hoverMessage {
          transform: translateX(0);
          opacity: 1;
        }
        .inactive .iconContainer,
        .inactive .mainContent {
          opacity: 0.4;
        }
      `}</style>
    </button>
  )
}

ListItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  active: PropTypes.bool,
  activeHoverMessage: PropTypes.string,
  inactiveHoverMessage: PropTypes.string,
  icon: PropTypes.func,
  onClick: PropTypes.func,
  style: PropTypes.shape({ margin: PropTypes.string }),
}

ListItem.defaultProps = {
  title: '',
  description: '',
  active: true,
  activeHoverMessage: '',
  inactiveHoverMessage: '',
  icon: null,
  onClick: () => {},
  style: {},
}