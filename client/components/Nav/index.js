import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function Nav({ location, links }) {
  return (
    <div className="root">
      {links.map(({ href, label }) => (
        <div
          className={`link ${location.pathname === href ? 'current' : ''}`}
        >
          <Link to={href} key={href}>{label}</Link>
        </div>
      ))}
      <style jsx>{`
        .root {
          display: flex;
          align-items: center;
          height: 3em;
          padding: 0 1.6em;
        }

        .link {
          margin-right: 0.8em;
        }

        .link :global(a) {
          color: inherit;
          font-size: 1.2em;
          font-weight: inherit;
          text-decoration: none;
        }

        .current {
          color: white;
        }
      `}</style>
    </div>
  )
}

Nav.propTypes = {
  location: PropTypes.shape(),
  links: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string,
    label: PropTypes.string,
  })),
}

Nav.defaultProps = {
  location: {},
  links: [],
}
