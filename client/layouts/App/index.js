import React from 'react'
import PropTypes from 'prop-types'
import { calamity, calamityBold } from '../../fonts'

export default function App({ children }) {
  return (
    <div className="root">
      {children}
      <style jsx>{`
        @font-face {
          font-family: 'Calamity';
          src: url('${calamity}') format('woff2');
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'Calamity';
          src: url('${calamityBold}') format('woff2');
          font-weight: 600;
          font-style: normal;
        }
        .root {
          width: 100%;
          height: 100%;
          font-family: 'Calamity', sans-serif;
          line-height: 1.3;
          color: rgb(209, 212, 192);
          background-color: black;
        }
      `}</style>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.node,
}

App.defaultProps = {
  children: [],
}
