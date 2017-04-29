import React from 'react'
import PropTypes from 'prop-types'
import { black, primaryText, secondaryText } from '../../style/color'

const applyText = (prop, applyArgs) =>
  (typeof prop === 'function' ? prop(...applyArgs) : prop)

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
          <div className="title">
            {applyText(title, [{ active }])}
          </div>
          <div className="description">
            {applyText(description, [{ active }])}
          </div>
        </div>
        <div className="hoverMessage">
          {active
            ? applyText(activeHoverMessage, [{ active }])
            : applyText(inactiveHoverMessage, [{ active }])
          }
        </div>
      </div>
      <div className="cornerPiece tl" />
      <div className="cornerPiece tr" />
      <div className="cornerPiece bl" />
      <div className="cornerPiece br" />
      <style jsx>{`
        @keyframes pulse {
          from {
            box-shadow: 0px 0px 12px rgba(209, 226, 192, 0.4);
          }
          to {
            box-shadow: 0px 0px 16px rgba(209, 226, 192, 1);
          }
        }

        .root {
          padding: 0;
          cursor: pointer;
          display: block;
          font: inherit;
          highlight: none !important;
          outline: 1px solid ${black(0.8)};
          border: 2px solid ${primaryText(0)};
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
          animation: pulse 1s infinite alternate;
          border-color: ${primaryText(0.96)};
          outline-color: ${black()};
          z-index: 2;
        }

        .content {
          padding: 0.4em 0.6em;
          background-color: ${black(0.8)};
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          z-index: 1;
        }

        .root:hover .content {
          background-color: ${black()};
        }

        .iconContainer {
          height: 2.6em;
          margin-right: 0.4em;
        }

        .title {
          color: ${primaryText()};
          font-size: 1.2em;
          font-weight: 600;
        }

        .description {
          font-size: 0.8em;
          color: ${secondaryText()};
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
          color: ${primaryText(0.6)};
          pointer-events: none;
          background-color: ${black(0.4)};
          transform: translateX(20%);
          opacity: 0;
          transition: transform 0.2s ease-out;
        }

        .active .hoverMessage {
          text-shadow: 0 0 2px ${primaryText()};
        }

        .root:hover .hoverMessage {
          transform: translateX(0);
          opacity: 1;
        }

        .inactive .iconContainer,
        .inactive .mainContent {
          opacity: 0.4;
        }

        .cornerPiece {
          position: absolute;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 1em 1em 0 0;
          border-color: ${primaryText()} transparent transparent transparent;
          opacity: 0;
          z-index: 2;
          will-change: transform, opacity;
        }

        .root:hover .cornerPiece {
          transition: opacity 0.2s ease-out;
          opacity: 1;
        }

        @keyframes tlPulse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(360deg) translate(-50%, -50%);
          }
        }

        .cornerPiece.tl {
          top: 0;
          left: 0;
          transform: rotate(360deg);
        }

        .root:hover .cornerPiece.tl {
          animation: tlPulse 0.3s infinite alternate ease-in-out;
        }

        @keyframes trPulse {
          from {
            transform: rotate(90deg);
          }
          to {
            transform: rotate(90deg) translate(-50%, -50%);
          }
        }

        .cornerPiece.tr {
          top: 0;
          right: 0;
          transform: rotate(90deg);
        }

        .root:hover .cornerPiece.tr {
          animation: trPulse 0.3s infinite alternate ease-in-out;
        }

        @keyframes blPulse {
          from {
            transform: rotate(-90deg);
          }
          to {
            transform: rotate(-90deg) translate(-50%, -50%);
          }
        }

        .cornerPiece.bl {
          bottom: 0;
          left: 0;
          transform: rotate(-90deg);
        }

        .root:hover .cornerPiece.bl {
          animation: blPulse 0.3s infinite alternate ease-in-out;
        }

        @keyframes brPulse {
          from {
            transform: rotate(180deg);
          }
          to {
            transform: rotate(180deg) translate(-50%, -50%);
          }
        }

        .cornerPiece.br {
          bottom: 0;
          right: 0;
          transform: rotate(180deg);
        }

        .root:hover .cornerPiece.br {
          animation: brPulse 0.3s infinite alternate ease-in-out;
        }
      `}</style>
    </button>
  )
}

const textProp = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func,
])

ListItem.propTypes = {
  title: textProp,
  description: textProp,
  activeHoverMessage: textProp,
  inactiveHoverMessage: textProp,
  active: PropTypes.bool,
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
